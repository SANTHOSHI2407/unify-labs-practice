// ─────────────────────────────────────────────────
//   script.js — MongoDB CRUD API Tester (Simulated)
// ─────────────────────────────────────────────────

// ── Tab Switching ─────────────────────────────────
document.querySelectorAll('.tab').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));

    tab.classList.add('active');
    document.getElementById(`tab-${tab.dataset.tab}`).classList.add('active');

    clearResponse();
  });
});

// ── Helper: display response ──────────────────────
function showResponse(status, data, isError = false) {
  const badge  = document.getElementById('status-badge');
  const output = document.getElementById('response-output');

  badge.textContent = `${status}`;
  badge.className   = 'status-badge ' + (isError ? 'err' : 'ok');
  output.textContent = JSON.stringify(data, null, 2);

  // Animate
  output.style.opacity = '0';
  requestAnimationFrame(() => {
    output.style.transition = 'opacity 0.3s';
    output.style.opacity = '1';
  });
}

function clearResponse() {
  document.getElementById('status-badge').textContent = '';
  document.getElementById('status-badge').className   = 'status-badge';
  document.getElementById('response-output').textContent = '// Click "Send Request" to simulate a response...';
}

// ── Fake ObjectId generator ───────────────────────
function fakeObjectId() {
  const hex = '0123456789abcdef';
  return Array.from({ length: 24 }, () => hex[Math.floor(Math.random() * 16)]).join('');
}

// ── In-memory "database" ──────────────────────────
const db = {};

// ── POST /products ────────────────────────────────
function runPost() {
  const name  = document.getElementById('p-name').value.trim();
  const price = parseFloat(document.getElementById('p-price').value);
  const stock = parseInt(document.getElementById('p-stock').value);

  if (!name || isNaN(price) || isNaN(stock)) {
    showResponse(400, { error: 'Validation failed: name, price, and stock are required.' }, true);
    return;
  }

  const product = {
    _id:       fakeObjectId(),
    name,
    price,
    stock,
    __v:       0,
    createdAt: new Date().toISOString()
  };

  db[product._id] = product;

  showResponse(201, product);
  console.log('[POST] Product saved:', product);
}

// ── PATCH /products/:id ───────────────────────────
function runPatch() {
  const id    = document.getElementById('pa-id').value.trim();
  const stock = parseInt(document.getElementById('pa-stock').value);

  if (!id) {
    showResponse(400, { error: 'Product ID is required.' }, true);
    return;
  }
  if (isNaN(stock)) {
    showResponse(400, { error: 'Validation failed: stock must be a number.' }, true);
    return;
  }

  // Simulate: find in local DB or create a fake existing document
  if (!db[id]) {
    // Simulate 404 if id looks invalid, otherwise make a fake doc
    if (id.length !== 24) {
      showResponse(404, { error: 'Product not found.' }, true);
      return;
    }
    db[id] = { _id: id, name: 'Existing Product', price: 49.99, stock: 100, __v: 0 };
  }

  // Only update stock (as per PATCH spec)
  db[id].stock = stock;

  showResponse(200, { ...db[id], stock });
  console.log('[PATCH] Stock updated for:', id, '→ stock:', stock);
}

// ── DELETE /products/:id ──────────────────────────
function runDelete() {
  const id = document.getElementById('d-id').value.trim();

  if (!id) {
    showResponse(400, { error: 'Product ID is required.' }, true);
    return;
  }

  if (!db[id]) {
    if (id.length !== 24) {
      showResponse(404, { error: 'Product not found.' }, true);
      return;
    }
    // Simulate successful deletion of an "existing" document
    showResponse(200, {
      message: 'Product deleted',
      id: id
    });
    console.log('[DELETE] Deleted product:', id);
    return;
  }

  const deleted = { ...db[id] };
  delete db[id];

  showResponse(200, {
    message: 'Product deleted',
    id: deleted._id
  });
  console.log('[DELETE] Deleted product:', deleted);
}

// ── Keyboard: Enter triggers active tab's button ──
document.addEventListener('keydown', e => {
  if (e.key === 'Enter' && e.target.tagName === 'INPUT') {
    const activeTab = document.querySelector('.tab.active');
    if (!activeTab) return;
    const map = { post: runPost, patch: runPatch, delete: runDelete };
    const fn = map[activeTab.dataset.tab];
    if (fn) fn();
  }
});

// ── Init log ──────────────────────────────────────
console.log('%c⬡ ProductAPI Tester Ready', 'color:#00e5ff;font-weight:bold;font-size:14px;');
console.log('%cSimulating MongoDB CRUD operations in-memory.', 'color:#555d7a;');
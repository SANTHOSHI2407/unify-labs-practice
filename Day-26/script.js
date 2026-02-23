function copy(text) {
  navigator.clipboard.writeText(text).catch(() => {});
  const toast = document.getElementById('toast');
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 1800);
}

function runDemo() {
  const log    = document.getElementById('logLine');
  const pulse  = document.getElementById('pulse');
  const label  = document.getElementById('connLabel');
  const connDb = document.getElementById('connDb');

  // Reset state
  log.classList.remove('visible');
  pulse.style.background = 'var(--amber)';
  label.style.color      = 'var(--amber)';
  label.textContent      = 'Connecting…';
  connDb.textContent     = '—';

  // Simulate connection delay
  setTimeout(() => {
    log.classList.add('visible');
    pulse.style.background = 'var(--green)';
    label.style.color      = 'var(--green)';
    label.textContent      = 'Connected';
    connDb.textContent     = 'default db · port 27017';
  }, 900);
}
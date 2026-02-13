  <script>
    // 1. Filter Example
    const tasks = [
      { task: "Submit report", status: "Completed" },
      { task: "Update database", status: "Pending" },
      { task: "Email client", status: "Completed" },
      { task: "Backup files", status: "Pending" }
    ];

    const completedTasks = tasks.filter(t => t.status === "Completed");
    const pendingTasks = tasks.filter(t => t.status === "Pending");

    const completedList = document.getElementById("completed");
    const pendingList = document.getElementById("pending");

    completedTasks.forEach(t => {
      const li = document.createElement("li");
      li.textContent = t.task;
      li.classList.add("completed");
      completedList.appendChild(li);
    });

    pendingTasks.forEach(t => {
      const li = document.createElement("li");
      li.textContent = t.task;
      li.classList.add("pending");
      pendingList.appendChild(li);
    });

    // 2. Map Example
    const prices = [100, 250, 400, 50];
    const taxRate = 0.18;

    const finalPrices = prices.map(p => (p * (1 + taxRate)).toFixed(2));

    const priceTable = document.getElementById("priceTable");
    prices.forEach((p, i) => {
      const row = document.createElement("tr");
      row.innerHTML = `<td>$${p}</td><td>$${finalPrices[i]}</td>`;
      priceTable.appendChild(row);
    });

    // 3. Reduce Example
    const expenses = [1200, 3400, 560, 780, 1500];
    const totalBudget = expenses.reduce((acc, val) => acc + val, 0);

    document.getElementById("expenses").textContent = expenses.join(", ");
    document.getElementById("budget").textContent = "$" + totalBudget;
  </script>
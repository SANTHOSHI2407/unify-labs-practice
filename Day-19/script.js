
<script>
    document.getElementById("addBtn").addEventListener("click", addTask);

    function addTask() {
        const input = document.getElementById("taskInput");
        const taskText = input.value.trim();

        if (taskText === "") {
            alert("Please enter a task");
            return;
        }

        const li = document.createElement("li");

        // Task text span
        const taskSpan = document.createElement("span");
        taskSpan.textContent = taskText;

        // Toggle completed class on click
        taskSpan.addEventListener("click", function () {
            li.classList.toggle("completed");
        });

        // Delete button
        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.className = "delete-btn";

        deleteBtn.addEventListener("click", function () {
            li.remove();
        });

        li.appendChild(taskSpan);
        li.appendChild(deleteBtn);
        document.getElementById("taskList").appendChild(li);

        input.value = "";
    }
</script>
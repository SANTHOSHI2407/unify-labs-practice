
<script>
    function addIntern() {
        const name = document.getElementById("name").value;
        const role = document.getElementById("role").value;
        const joinedDate = document.getElementById("joinedDate").value;

        if (!name || !role || !joinedDate) {
            alert("Please fill all fields");
            return;
        }

        // Document structure (same as MongoDB document)
        const internData = {
            name: name,
            role: role,
            joinedDate: joinedDate
        };

        // Displaying data (simulation of MongoDB insert)
        document.getElementById("output").innerHTML =
            "<b>Inserted into:</b> unify_labs → interns <br><br>" +
            JSON.stringify(internData, null, 2);

        // Clear inputs
        document.getElementById("name").value = "";
        document.getElementById("role").value = "";
        document.getElementById("joinedDate").value = "";
    }
</script>

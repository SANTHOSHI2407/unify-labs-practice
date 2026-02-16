
    <script>
        const spinner = document.getElementById("spinner");
        const postsContainer = document.getElementById("posts");

        function fetchPosts() {
            postsContainer.innerHTML = "";
            spinner.style.display = "block";

            fetch("https://jsonplaceholder.typicode.com/posts?_limit=5")
                .then(response => response.json())
                .then(data => {
                    spinner.style.display = "none";

                    data.forEach(post => {
                        const postDiv = document.createElement("div");
                        postDiv.className = "post";

                        postDiv.innerHTML = `
                            <h4>${post.title}</h4>
                            <p>${post.body}</p>
                        `;

                        postsContainer.appendChild(postDiv);
                    });
                })
                .catch(error => {
                    spinner.style.display = "none";
                    postsContainer.innerHTML = "<p>Error loading data</p>";
                    console.error(error);
                });
        }
    </script>
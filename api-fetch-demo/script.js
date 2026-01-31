console.log("script.js loaded");

const output = document.getElementById("output");

function loadTodos() {
    fetch("https://jsonplaceholder.typicode.com/todos")
        .then(res => {
            if (!res.ok) {
                throw new Error('Network response was not ok');
            }
            return res.json();
        })
        .then(data => {
            let html = "<h2>Todos</h2>";
            data.slice(0, 10).forEach(todo => {
                html += `
                    <div class="card">
                        ${todo.title}
                    </div>
                `;
            });
            output.innerHTML = html;
        })
        .catch(error => {
            output.innerHTML = `<p>Error loading todos: ${error.message}</p>`;
        });
}

function loadComments() {
    fetch("https://jsonplaceholder.typicode.com/comments")
        .then(res => {
            if (!res.ok) {
                throw new Error('Network response was not ok');
            }
            return res.json();
        })
        .then(data => {
            let html = "<h2>Comments</h2>";
            data.slice(0, 5).forEach(c => {
                html += `
                    <div class="card">
                        ${c.email}<br>${c.body}
                    </div>
                `;
            });
            output.innerHTML = html;
        })
        .catch(error => {
            output.innerHTML = `<p>Error loading comments: ${error.message}</p>`;
        });
}

function loadUsers() {
    fetch("https://jsonplaceholder.typicode.com/users")
        .then(res => {
            if (!res.ok) {
                throw new Error('Network response was not ok');
            }
            return res.json();
        })
        .then(data => {
            let html = "<h2>Users</h2>";
            data.forEach(u => {
                html += `
                    <div class="card">
                        ${u.name} - ${u.email}
                    </div>
                `;
            });
            output.innerHTML = html;
        })
        .catch(error => {
            output.innerHTML = `<p>Error loading users: ${error.message}</p>`;
        });
}

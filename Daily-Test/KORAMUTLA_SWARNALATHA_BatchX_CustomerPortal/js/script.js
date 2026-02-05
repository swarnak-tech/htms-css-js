// Form Validation
document.getElementById("contactForm").addEventListener("submit", function (e) {
    e.preventDefault();

    let name = document.getElementById("name");
    let email = document.getElementById("email");
    let valid = true;

    if (name.value === "") {
        name.classList.add("is-invalid");
        valid = false;
    } else {
        name.classList.remove("is-invalid");
    }

    if (email.value === "") {
        email.classList.add("is-invalid");
        valid = false;
    } else {
        email.classList.remove("is-invalid");
    }

    if (valid) {
        document.getElementById("successMsg").innerText = "Form submitted successfully!";
        this.reset();
    }
});

// Fetch API
fetch("https://jsonplaceholder.typicode.com/users")
    .then(response => response.json())
    .then(data => {
        let table = document.getElementById("userTable");
        data.slice(0, 5).forEach(user => {
            let row = `<tr>
                <td>${user.name}</td>
                <td>${user.email}</td>
            </tr>`;
            table.innerHTML += row;
        });
    })
    .catch(error => console.error("Error:", error));

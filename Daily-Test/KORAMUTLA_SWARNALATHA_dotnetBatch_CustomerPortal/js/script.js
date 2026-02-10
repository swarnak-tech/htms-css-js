// FORM VALIDATION 
document.getElementById("contactForm").addEventListener("submit", function (e) {
  e.preventDefault();

  let name = document.getElementById("name");
  let email = document.getElementById("email");
  let successMsg = document.getElementById("successMsg");

  let valid = true;

  if (name.value.trim() === "") {
    name.classList.add("is-invalid");
    valid = false;
  } else {
    name.classList.remove("is-invalid");
  }

  if (email.value.trim() === "") {
    email.classList.add("is-invalid");
    valid = false;
  } else {
    email.classList.remove("is-invalid");
  }

  if (valid) {
    successMsg.innerText = "Form submitted successfully!";
    this.reset();
  }
});

// FETCH + PAGINATION 
const table = document.getElementById("userTable");
const page1 = document.getElementById("page1");
const page2 = document.getElementById("page2");

let usersData = [];

// Fetch users
fetch("https://jsonplaceholder.typicode.com/users")
  .then(response => response.json())
  .then(data => {
    usersData = data;
    loadPage(1);
  })
  .catch(error => console.error("Error fetching users:", error));

// Load page data
function loadPage(page) {
  table.innerHTML = "";

  let start = page === 1 ? 0 : 5;
  let end = page === 1 ? 5 : 10;

  usersData.slice(start, end).forEach(user => {
    table.innerHTML += `
      <tr>
        <td>${user.name}</td>
        <td>${user.email}</td>
      </tr>
    `;
  });

  page1.classList.remove("active");
  page2.classList.remove("active");

  if (page === 1) page1.classList.add("active");
  if (page === 2) page2.classList.add("active");
}

// Pagination click events
page1.addEventListener("click", () => loadPage(1));
page2.addEventListener("click", () => loadPage(2));

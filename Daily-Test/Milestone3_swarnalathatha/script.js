//const sections = document.querySelectorAll(".section");
//const navLinks = document.querySelectorAll(".nav-link");
const requestForm = document.getElementById("requestForm");
const requestTable= document.getElementById("requestTable")
const successMessage = document.getElementById("successMessage");

let requests =[];
/*SPA Navigation*/
// navLinks.forEach(link => {
//     link.addEventListener("click", (e) => {
//         e.preventDefault(); 
//         const target = link.dataset.section;
//         sections.forEach(sec => sec.classList.remove("active"));
//         document.getElementById(target).classList.add("active");
//     });
// });
const navLinks = document.querySelectorAll(".nav-link");
const sections = document.querySelectorAll(".section");

navLinks.forEach(link => {
    link.addEventListener("click", function(e)  {
        e.preventDefault();
        const targetId = this.getAttribute("data-section");
        sections.forEach(section => {
            section.classList.remove("active");
        });
        document.getElementById(targetId).classList.add("active");
    });
});

/*scroll button*/
document.getElementById("scrollTopForm").addEventListener("click", () => {
    sections.forEach(sec => sec.classList.remove("active"));
    document.getElementById("request").classList.add("active");
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

/*Fetch submission*/
const loadServices = async () => {
    try {
        const response = await fetch("data.json");
        const data = await response.json();

        const cards = data.map(service => `
            <div class="col-md-4">
            <div class ="card mb-3">
            <div class="card-body"> 
            <h5>${service.name}</h5>
            <p>${service.description}</p>
            <button class="btn btn-primary request-btn">Request Service</button>
            </div>
            </div>
            </div>
        `) 

        document.getElementById("serviceCards").innerHTML = cards.join("");
    } catch  {
        document.getElementById("serviceCards").innerHTML = "<p class='text-danger'>Failed to load services. Please try again later.</p>";
    }
};

loadServices();

/*Form Validation + Submission*/
requestForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const serviceType = document.getElementById("serviceType").value;
    const description = document.getElementById("description").value.trim();

    if (!name || !email || !serviceType || !description) {
        alert("Please fill in all fields.");

        return;
    }

    const updateTable = () => {
        requestTable.innerHTML = requests
        .map(
            req => `
            <tr>
                <td>${req.name}</td>
               
                <td>${req.serviceType}</td>
                <td>${req.description}</td>
            </tr>
        `).join("");
    }

    const request = {name, email, serviceType, description};
    requests.push(request);
    updateTable();
    successMessage.classList.remove("d-none");
    requestForm.reset();
    
    setTimeout(() => {
        successMessage.classList.add("d-none");
    }, 3000);
});

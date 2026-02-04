function getUser() {
    fetch("https://randomuser.me/api/")
        .then(response => response.json())
        .then(data => {
            const user = data.results[0];

            document.getElementById("userData").innerHTML = `
                <h3>${user.name.first} ${user.name.last}</h3>
                <p>Email: ${user.email}</p>
                <img src="${user.picture.large}" alt="Profile Picture">
            `;
        })
        .catch(error => {
            console.log("Error fetching user:", error);
        });
}

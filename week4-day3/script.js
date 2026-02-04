// Fetch employee data from API
fetch("https://dummy.restapiexample.com/api/v1/employees")
    .then(response => response.json()) // convert response to JSON
    .then(data => {
        console.log("Employee Data:");
        console.log(data);
    })
    .catch(error => {
        console.log("Error fetching data:", error);
    });

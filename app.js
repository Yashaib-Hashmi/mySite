// Declare a global variable to store the ambulance data
let ambulances = [];

// Fetch the ambulance data from the JSON file
fetch('ambulance.json')
  .then(response => response.json())
  .then(response => {
    // Assign the fetched ambulances to the global variable
    ambulances = response.ambulances;

    // Function to display all ambulances (can also be used to render filtered results)
    displayAmbulances(ambulances);
  });

// Function to display ambulances (used for both initial display and filtering)
function displayAmbulances(ambulancesToDisplay) {
  let ambulanceHTML = "";

  // Loop through the array of ambulances
  for (let data of ambulancesToDisplay) {
    ambulanceHTML += `
      <div class="col-md-4">
        <div class="card custom-card zoom mb-4">
          <img src="${data.image}" class="card-img-top" alt="${data.name}" style="height: 300px; object-fit: cover;">
          <div class="card-body">
            <h5 class="card-title">${data.name}</h5>
            <p class="card-text">City: ${data.region}</p>
            <p class="card-text">Type: ${data.type}</p>
            <p class="card-text">Cost: $${data.price}</p>
            <p class="card-text">Specialization: ${data.specialization}</p>
                <div>
                  <a class="btn btn-primary" href="booknow.html?id=${data.id}" id="bookbtnshow">Book Now</a>
                  
                </div>
            </div>
        </div>
      </div>
    `;
  }

  // Insert the generated HTML into the container with id "showAllAmbulances"
  document.getElementById("showAllAmbulances").innerHTML = ambulanceHTML;
}

// Filtering function to filter ambulances based on user input
function filterAmbulances() {
  // Get the values from the input fields
  const regionInput = document.getElementById('regionInput').value.toLowerCase();
  const priceInput = document.getElementById('priceInput').value;
  const typeInput = document.getElementById('typeInput').value.toLowerCase();

  // Filter the ambulances array
  const filteredAmbulances = ambulances.filter(ambulance => {
    const matchesRegion = regionInput ? ambulance.region.toLowerCase().includes(regionInput) : true;
    const matchesPrice = priceInput ? ambulance.price <= parseFloat(priceInput) : true;
    const matchesType = typeInput ? ambulance.type.toLowerCase().includes(typeInput) : true;

    return matchesRegion && matchesPrice && matchesType;
  });

  // Display the filtered ambulances
  displayAmbulances(filteredAmbulances);
}




// Register User


document.getElementById("registrationForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent the form from submitting

    // Get form values
    const username = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();
    const confirmPassword = document.getElementById('confirm_password').value.trim();

    // Regular expressions for validation
    const usernameRegex = /^[a-zA-Z0-9]{3,}$/; // Alphanumeric, at least 3 characters
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Simple email format
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/; // 8+ chars, 1 number, 1 uppercase, 1 special char

    // Validation checks
    if (!usernameRegex.test(username)) {
        showMessage('Username must be at least 3 characters long and contain only letters and numbers.', 'danger');
        return;
    }

    if (!emailRegex.test(email)) {
        showMessage('Please enter a valid email address.', 'danger');
        return;
    }

    if (!passwordRegex.test(password)) {
        showMessage('Password must be at least 8 characters long, contain at least one uppercase letter, one number, and one special character.', 'danger');
        return;
    }

    if (password !== confirmPassword) {
        showMessage('Passwords do not match.', 'danger');
        return;
    }

    // If all validations pass, store the data in localStorage
    const userData = {
        username: username,
        email: email,
        password: password
    };

    localStorage.setItem('user', JSON.stringify(userData));
    showMessage('Account created successfully!', 'success');
});

// Function to display messages
function showMessage(message, type) {
    const messageDiv = document.getElementById('message');
    messageDiv.innerHTML = `<div class="alert alert-${type}">${message}</div>`;
    setTimeout(() => {
        messageDiv.innerHTML = '';
    }, 5000); // Message disappears after 5 seconds
}







// Login Form
function login(){
    
    const enteredUsername = document.getElementById('loginUsername').value.trim();
    const enteredPassword = document.getElementById('loginPassword').value.trim();
    var message = document.getElementById("loginMessage");
    // Fetch the stored user data from localStorage
    const storedUser = JSON.parse(localStorage.getItem('user'));
    var error = "";
    if(enteredUsername == ""){
        message.innerHTML = "<h5 style='color:red'>Fill Name</h5>";
        error +="error"
    }


    if(enteredPassword == ""){
        message.innerHTML = "<h5 style='color:red'>Fill Password</h5>";
        error +="error"
    }

    if(error == ""){
        const storedUsername = storedUser.username;
        const storedPassword = storedUser.password;

        if (enteredUsername == storedUsername && enteredPassword == storedPassword) {
            
            // You can redirect to a dashboard or another page here if needed
            localStorage.setItem("isLogin","isLogin")
            location.assign('/index.html');

        }else{
            message.innerHTML = "<h5 style='color:red'>User Name Or Password Incorrect</h5>";
        }
    }

}





function logout(){
    localStorage.removeItem('isLogin')
    location.assign('login.html')
}




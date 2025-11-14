let currentUser = null;

// Show register/login forms
function showRegister() {
    document.getElementById("login-box").style.display = "none";
    document.getElementById("register-box").style.display = "block";
}
function showLogin() {
    document.getElementById("register-box").style.display = "none";
    document.getElementById("login-box").style.display = "block";
}

// Register
document.getElementById("register-form").addEventListener("submit", function(e){
    e.preventDefault();
    const realname = document.getElementById("reg-realname").value.trim();
    const username = document.getElementById("reg-username").value.trim();
    const password = document.getElementById("reg-password").value.trim();

    let users = JSON.parse(localStorage.getItem("users") || "[]");
    if(users.some(u => u.username === username)){
        document.getElementById("register-msg").textContent = "Username already exists!";
        document.getElementById("register-msg").style.color = "red";
        return;
    }

    users.push({realname, username, password});
    localStorage.setItem("users", JSON.stringify(users));
    document.getElementById("register-msg").textContent = "Registration successful!";
    document.getElementById("register-msg").style.color = "green";
    document.getElementById("register-form").reset();
});

// Login
document.getElementById("login-form").addEventListener("submit", function(e){
    e.preventDefault();
    const username = document.getElementById("login-username").value.trim();
    const password = document.getElementById("login-password").value.trim();
    let users = JSON.parse(localStorage.getItem("users") || "[]");

    const user = users.find(u => u.username === username && u.password === password);
    if(user){
        currentUser = user;
        document.getElementById("auth-container").style.display = "none";
        document.getElementById("dashboard").style.display = "flex";
        showPage("home");
        document.getElementById("user-name").textContent = currentUser.realname;
        document.getElementById("user-count").textContent = users.length;
        // Load profile info
        document.getElementById("profile-realname").value = currentUser.realname;
        document.getElementById("profile-password").value = currentUser.password;
    } else {
        document.getElementById("login-msg").textContent = "Invalid username or password!";
    }
});

// Logout
function logout() {
    currentUser = null;
    document.getElementById("dashboard").style.display = "none";
    document.getElementById("auth-container").style.display = "flex";
    document.getElementById("login-form").reset();
    document.getElementById("login-msg").textContent = "";
}

// Switch dashboard pages
function showPage(page) {
    const pages = ["home", "profile", "settings"];
    pages.forEach(p => {
        document.getElementById(`${p}-page`).style.display = "none";
    });
    document.getElementById(`${page}-page`).style.display = "block";
}

// Update profile
document.getElementById("profile-form").addEventListener("submit", function(e){
    e.preventDefault();
    const newName = document.getElementById("profile-realname").value.trim();
    const newPassword = document.getElementById("profile-password").value.trim();

    let users = JSON.parse(localStorage.getItem("users") || "[]");
    users = users.map(u => {
        if(u.username === currentUser.username){
            return { ...u, realname: newName, password: newPassword };
        }
        return u;
    });

    localStorage.setItem("users", JSON.stringify(users));
    currentUser.realname = newName;
    currentUser.password = newPassword;
    document.getElementById("user-name").textContent = currentUser.realname;
    document.getElementById("profile-msg").textContent = "Profile updated successfully!";
    document.getElementById("profile-msg").style.color = "green";
});

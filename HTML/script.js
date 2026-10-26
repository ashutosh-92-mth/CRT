document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const username = document.getElementById("username").value;

    if (username.trim() === "") {
        alert("Please enter your username.");
        return;
    }

    alert("Demo login successful!");
});
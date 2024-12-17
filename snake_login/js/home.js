let logOutBtn = document.getElementById("logOutBtn");
let welcomeUser = document.getElementById("userName");
let userName = localStorage.getItem("userName");

logOutBtn.addEventListener("click", function () {
  // Clear user data from localStorage if needed
  localStorage.removeItem("userName");
  localStorage.removeItem("user_i");
  // Navigate to index.html
  window.location.href = "index.html";

});

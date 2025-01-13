let local = JSON.parse(localStorage.getItem("access")) || [];
let form = document.getElementById("form");
let email = document.querySelector("#email");
let password = document.querySelector("#password");
let arr = [
  {
    "id" : "1",
    "password": "fozil123",
    "email" : "fozil",
    "name" : "fozil",
  },
  {
    "id" : "2",
    "password": "odil123",
    "email" : "odil",
    "name" : "odil"
  }
]
form.addEventListener("submit", (e) => {
  e.preventDefault();
  function checkfunc(data) {
    data.filter((value) => {
      if (value.email == email.value && value.password == password.value) {
        localStorage.setItem("access", JSON.stringify(value.name));
        localStorage.setItem("name", JSON.stringify(value.name));
        localStorage.setItem("userid", JSON.stringify(value.id));
        window.location.href = "../index.html";
      }
    });
  }
  checkfunc(arr)
});

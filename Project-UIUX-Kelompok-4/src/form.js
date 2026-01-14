const form = document.getElementById("orderForm");

form.addEventListener("submit", function (e) {
  e.preventDefault(); // stop reload / redirect default

  const order = {
  name: document.getElementById("fullName").value,
  address: document.getElementById("address").value,
  email: document.getElementById("email").value.trim().toLowerCase(),
  phone: document.getElementById("phone").value,
  gender: document.querySelector('input[name="gender"]:checked')?.value,
  package: document.getElementById("package").value,
  createdAt: new Date().toLocaleString()
};


  let orders = JSON.parse(localStorage.getItem("orders")) || [];
  orders.push(order);
  localStorage.setItem("orders", JSON.stringify(orders));

  window.location.href = "../src/pop-up.html";
});

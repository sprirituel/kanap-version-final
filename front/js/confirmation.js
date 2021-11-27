var orderId = JSON.parse(localStorage.getItem("orderId"));
document.getElementById("orderId").textContent = orderId

localStorage.removeItem("orderId")
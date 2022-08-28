const validation = window.location;
const url = new URL(validation);
const id = url.searchParams.get("id");
const orderId = document.querySelector("#orderId");
orderId.innerHTML = id;

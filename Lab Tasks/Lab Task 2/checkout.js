$(document).ready(function () {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const orderSummary = $("#order-summary");
  let total = 0;

  // Render cart items
  cart.forEach(item => {
    total += item.price;
    orderSummary.append(`
      <li class="list-group-item d-flex justify-content-between align-items-center">
        ${item.name}
        <span>$${item.price.toFixed(2)}</span>
      </li>
    `);
  });

  $("#checkout-total").text(total.toFixed(2));

  // Form validation
  $("#checkout-form").on("submit", function (e) {
    e.preventDefault();
    let isValid = true;

    const name = $("#name");
    const email = $("#email");
    const address = $("#address");

    if (!name.val().trim()) {
      name.addClass("is-invalid");
      isValid = false;
    } else {
      name.removeClass("is-invalid");
    }

    const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
    if (!emailPattern.test(email.val())) {
      email.addClass("is-invalid");
      isValid = false;
    } else {
      email.removeClass("is-invalid");
    }

    if (!address.val().trim()) {
      address.addClass("is-invalid");
      isValid = false;
    } else {
      address.removeClass("is-invalid");
    }

    if (isValid) {
      alert("Order placed successfully!");
      localStorage.removeItem("cart");
      window.location.href = "index.html";
    }
  });
});

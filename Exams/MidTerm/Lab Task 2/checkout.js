$(document).ready(function () {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const orderSummary = $("#order-summary");
  let total = 0;

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

  $("#checkout-form").on("submit", function (e) {
    e.preventDefault();

    $(".form-control").removeClass("is-invalid");
    let isValid = true;

    const name = $("#name");
    if (!name.val().trim() || !/^[A-Za-z\s]+$/.test(name.val())) {
      name.addClass("is-invalid");
      isValid = false;
    }

    const email = $("#email");
    const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
    if (!emailPattern.test(email.val())) {
      email.addClass("is-invalid");
      isValid = false;
    }

    const phone = $("#phone");
    const phonePattern = /^\d{10,15}$/;
    if (!phonePattern.test(phone.val())) {
      phone.addClass("is-invalid");
      isValid = false;
    }

    const address = $("#address");
    if (!address.val().trim()) {
      address.addClass("is-invalid");
      isValid = false;
    }

    const cardNumber = $("#card-number");
    const cardNumberPattern = /^\d{16}$/;
    if (!cardNumberPattern.test(cardNumber.val())) {
      cardNumber.addClass("is-invalid");
      isValid = false;
    }

    const expiryDate = $("#expiry-date");
    const currentDate = new Date();
    const expiry = new Date(expiryDate.val());
    if (!expiryDate.val() || expiry <= currentDate) {
      expiryDate.addClass("is-invalid");
      isValid = false;
    }

    const cvv = $("#cvv");
    const cvvPattern = /^\d{3}$/;
    if (!cvvPattern.test(cvv.val())) {
      cvv.addClass("is-invalid");
      isValid = false;
    }

    if (isValid) {
      alert("Order placed successfully!");
      localStorage.removeItem("cart");
      window.location.href = "index.html";
    }
  });
});

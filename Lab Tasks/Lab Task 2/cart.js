
$(document).ready(function () {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];

  function updateCart() {
    let cartTotal = cart.reduce((total, item) => total + item.price, 0);
    let cartCount = cart.length;

    $('.badge').text(cartCount);

    $('#checkout-total').text(cartTotal.toFixed(2));
    $('#order-summary').empty();
    cart.forEach((item, index) => {
      $('#order-summary').append(`
        <li class="list-group-item d-flex justify-content-between align-items-center">
          ${item.name}
          <span>$${item.price.toFixed(2)}</span>
        </li>
      `);
    });

    $('#cart-items').empty();
    if (cart.length === 0) {
      $('#cart-items').append('<li class="list-group-item text-center">Your cart is empty.</li>');
    } else {
      cart.forEach((item, index) => {
        $('#cart-items').append(`
          <li class="list-group-item d-flex justify-content-between align-items-center">
            ${item.name}
            <div>
              <span class="me-3">$${item.price.toFixed(2)}</span>
              <button class="btn btn-sm btn-outline-danger remove-item" data-index="${index}">✖</button>
            </div>
          </li>
        `);
      });
    }

    $('#cart-total').text(cartTotal.toFixed(2));
    localStorage.setItem('cart', JSON.stringify(cart));
  }

  $('.add-to-cart').on('click', function () {
    const id = $(this).data('id');
    const name = $(this).data('name');
    const price = parseFloat($(this).data('price'));

    cart.push({ id, name, price });
    updateCart();
  });

  $(document).on('click', '.remove-item', function () {
    const index = $(this).data('index');
    cart.splice(index, 1);
    updateCart();
  });

  $('#cartModal').on('shown.bs.modal', function () {
    updateCart();
  });

  updateCart();
});



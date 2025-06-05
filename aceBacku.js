const checkoutButton = document.getElementById('checkout-form-submit-button');

if (checkoutButton) {
  const payZipCodes = [75022,75038,75050,75051,75052,75054,75059,75060,75061,75062,75063,75064,75099,75249,75368,76008,76009,76035,76051,76058,76071,76085,76247,76262];
  const freeZipCodes = [76001,76002,76005,76006,76010,76011,76012,76013,76014,76015,76016,76017,76018,76019,76020,76021,76022,76028,76034,76036,76039,76040,76052,76053,76054,76060,76063,76092,76102,76103,76104,76105,76106,76107,76108,76109,76110,76111,76112,76114,76115,76116,76117,76118,76119,76120,76122,76123,76126,76127,76129,76130,76131,76132,76133,76134,76135,76137,76140,76148,76150,76155,76164,76166,76177,76179,76180,76182,76190,76191,76192,76193,76195,76196,76197,76198,76199,76244,76248];
  const validZipCodes = [75022,75038,75050,75051,75052,75054,75059,75060,75061,75062,75063,75064,75099,75249,75368,76008,76009,76035,76051,76058,76071,76085,76247,76262,76001,76002,76005,76006,76010,76011,76012,76013,76014,76015,76016,76017,76018,76019,76020,76021,76022,76028,76034,76036,76039,76040,76052,76053,76054,76060,76063,76092,76102,76103,76104,76105,76106,76107,76108,76109,76110,76111,76112,76114,76115,76116,76117,76118,76119,76120,76122,76123,76126,76127,76129,76130,76131,76132,76133,76134,76135,76137,76140,76148,76150,76155,76164,76166,76177,76179,76180,76182,76190,76191,76192,76193,76195,76196,76197,76198,76199,76244,76248]
  console.log('pay length: ', payZipCodes.length);
  console.log('free length: ', freeZipCodes.length);
  console.log('valid length: ', validZipCodes.length);
  let zipCodesPassed = false;
  const addressFields = document.getElementsByClassName('address-fieldset__row--field');
  const deliveryAddress = addressFields[3];
  const returnAddress = addressFields[10];
  const deliverZip = document.getElementById('shop_next_checkout_form_field_deliver_bins_1175_zipcode');
  const returnZip = document.getElementById('shop_next_checkout_form_field_pick_up_bins_1112_zipcode');
  const checkoutActions = document.getElementsByClassName('actions')[0];
  console.log(deliverZip, returnZip, checkoutActions)
  checkoutActions.addEventListener('click', event => {
    if (!zipCodesPassed) {
      event.preventDefault();

      if (!deliverZip.value && !returnZip.value) {
        zipCodesPassed = true;
        checkoutButton.click();
      }

      if
        (
          validZipCodes.includes(+deliverZip.value) &&
          validZipCodes.includes(+returnZip.value)
        ){
          zipCodesPassed = true;
          checkoutButton.click();
        } else {
          if (!checkoutActions.innerHTML.includes('service area')) {
            checkoutActions.innerHTML += `
              <div style="color: red; text-align: right" id="checkout-warning">
                <p>You may be outside our service area :(</p>
                <p>Double check your pickup and return addresses.</p>
                <p>Or give us a call. We're flexible: </p>
                <a href="javascript:void(0)" onclick="window.location='tel:+17132018511'">713-201-8511</a>
              </div>
              `
          }

          if (deliverZip.value && !validZipCodes.includes(+deliverZip.value)) {
            deliveryAddress.style.border = '2px red solid';
          }

          if (returnZip.value && !validZipCodes.includes(+returnZip.value)) {
            returnAddress.style.border = '2px red solid';
          }
        }

    }
  });

  deliverZip.addEventListener('keyup', () => {
    console.log(validZipCodes.includes(+deliverZip.value));
    console.log(+deliverZip.value)
    if (validZipCodes.includes(+deliverZip.value)) {
      const noDeliver = document.getElementById('delivery-out-of-service');
      if (noDeliver){
        console.log(noDeliver);
        noDeliver.remove();
      }
      deliveryAddress.style.border = '';
      if (validZipCodes.includes(+returnZip.value)) {
        const checkoutWarning = document.getElementById('checkout-warning');
        if (checkoutWarning) {
          checkoutWarning.remove();
        }
      }
    }
  })

  returnZip.addEventListener('keyup', () => {
    if (validZipCodes.includes(+returnZip.value)) {
      const noDeliver = document.getElementById('delivery-out-of-service');
      if (noDeliver){
        console.log(noDeliver);
        noDeliver.remove();
      }
      returnAddress.style.border = '';
      if (validZipCodes.includes(+deliverZip.value)) {
        const checkoutWarning = document.getElementById('checkout-warning');
        if (checkoutWarning) {
          checkoutWarning.remove();
        }
      }
    }
  })


}

const shadowHost = document.querySelector('bq-product-button');
if (shadowHost) {
// get product Name
const product = document.getElementsByClassName('product-main__title')[0];
const productName = product.innerHTML.toLowerCase();
if (productName.includes('studio')|| productName.includes('bedroom')) {
  // add this to as many event listeners as the crying baby Jesus allows
  function removeQuantitySelector() {
    const shadowRoot = shadowHost.shadowRoot;
    const quantitySelector = shadowRoot.querySelector('div.InputWrapper-czIup.dPlUYs');//Input-bBwSqK.fojUEK.bq-quantity
    if (quantitySelector){
      quantitySelector.remove();
    }
  }
  document.addEventListener("DOMContentLoaded", (event) => {
    removeQuantitySelector();
  });
  document.addEventListener("click", (event) => {
    removeQuantitySelector();
  });
  document.addEventListener("mousemove", (event) => {
    removeQuantitySelector();
  });
  document.addEventListener("mouseover", (event) => {
    removeQuantitySelector();
  });
}
}



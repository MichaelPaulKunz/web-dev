const checkoutButton = document.getElementById('checkout-form-submit-button');

// Enforce delivery zone by adding listeners to checkout button
if (checkoutButton) {
  // const payZipCodes = [75022,75038,75050,75051,75052,75054,75059,75060,75061,75062,75063,75064,75099,75249,75368,76008,76009,76035,76051,76058,76071,76085,76247,76262];
  // const freeZipCodes = [76001,76002,76005,76006,76010,76011,76012,76013,76014,76015,76016,76017,76018,76019,76020,76021,76022,76028,76034,76036,76039,76040,76052,76053,76054,76060,76063,76092,76102,76103,76104,76105,76106,76107,76108,76109,76110,76111,76112,76114,76115,76116,76117,76118,76119,76120,76122,76123,76126,76127,76129,76130,76131,76132,76133,76134,76135,76137,76140,76148,76150,76155,76164,76166,76177,76179,76180,76182,76190,76191,76192,76193,76195,76196,76197,76198,76199,76244,76248];
  // const validZipCodes = [75022,75038,75050,75051,75052,75054,75059,75060,75061,75062,75063,75064,75099,75249,75368,76008,76009,76035,76051,76058,76071,76085,76247,76262,76001,76002,76005,76006,76010,76011,76012,76013,76014,76015,76016,76017,76018,76019,76020,76021,76022,76028,76034,76036,76039,76040,76052,76053,76054,76060,76063,76092,76102,76103,76104,76105,76106,76107,76108,76109,76110,76111,76112,76114,76115,76116,76117,76118,76119,76120,76122,76123,76126,76127,76129,76130,76131,76132,76133,76134,76135,76137,76140,76148,76150,76155,76164,76166,76177,76179,76180,76182,76190,76191,76192,76193,76195,76196,76197,76198,76199,76244,76248]
  // only free codes:
  const validZipCodes = [76001,76002,76005,76006,76010,76011,76012,76013,76014,76015,76016,76017,76018,76019,76020,76021,76022,76028,76034,76036,76039,76040,76052,76053,76054,76060,76063,76092,76102,76103,76104,76105,76106,76107,76108,76109,76110,76111,76112,76114,76115,76116,76117,76118,76119,76120,76122,76123,76126,76127,76129,76130,76131,76132,76133,76134,76135,76137,76140,76148,76150,76155,76164,76166,76177,76179,76180,76182,76190,76191,76192,76193,76195,76196,76197,76198,76199,76244,76248];

  let zipCodesPassed = false;
  const addressFields = document.getElementsByClassName('address-fieldset__row--field');
  const deliveryAddress = addressFields[3];
  const returnAddress = addressFields[10];
  const deliverZip = document.getElementById('shop_next_checkout_form_field_deliver_bins_1175_zipcode');
  const returnZip = document.getElementById('shop_next_checkout_form_field_pick_up_bins_1112_zipcode');
  const checkoutActions = document.getElementsByClassName('actions')[0];

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
                <a href="javascript:void(0)" onclick="window.location='tel:+18177042724'">(817) 704-2724</a>
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
    if (validZipCodes.includes(+deliverZip.value)) {
      const noDeliver = document.getElementById('delivery-out-of-service');
      if (noDeliver){
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

// remove quantity selector from all rental bundles
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
function removeQuantitySelectors() {
  const config = { attributes: true, childList: true, subtree: true };

  const callback = (mutationList, observer) => {
    for (const mutation of mutationList) {

        const productLines = document.getElementsByClassName('Line-cspJES');

          Array.from(productLines).forEach(product => {
            if (product.innerHTML.includes('Studio') || product.innerHTML.includes('Bedroom')) {
              const counters = product.getElementsByClassName('Quantity-eFrOPT');
              counters[0].remove();
              const prices = product.getElementsByClassName('kfKWVA');
              prices[0].style.justifyContent = 'right';
            }
          })
          observer.disconnect();

    }
  };

  const observer = new MutationObserver(callback);

  observer.observe(document, config);
}


const addCartButton = document.querySelector('bq-product-button');
if (addCartButton) {
  console.log('add cart button: ', addCartButton);
  addCartButton.addEventListener('click', () => {
    removeQuantitySelectors();
    setTimeout(()=>{
              const productLines = document.getElementsByClassName('Line-cspJES');

          Array.from(productLines).forEach(product => {
            if (product.innerHTML.includes('Studio') || product.innerHTML.includes('Bedroom')) {
              const counters = product.getElementsByClassName('Quantity-eFrOPT');
              counters[0].remove();
              const prices = product.getElementsByClassName('kfKWVA');
              prices[0].style.justifyContent = 'right';
            }
          })
    }, 2000)
  })
}

const viewCartButton = document.querySelector('bq-minicart-button');
if (viewCartButton) {
  console.log('viewCartButton');
  viewCartButton.addEventListener('click', () => {
    console.log('what the FUCK??????????')
    removeQuantitySelectors();
    setTimeout(()=>{
              const productLines = document.getElementsByClassName('Line-cspJES');

          Array.from(productLines).forEach(product => {
            if (product.innerHTML.includes('Studio') || product.innerHTML.includes('Bedroom')) {
              const counters = product.getElementsByClassName('Quantity-eFrOPT');
              counters[0].remove();
              const prices = product.getElementsByClassName('kfKWVA');
              prices[0].style.justifyContent = 'right';
            }
          })
    }, 2000)
  })
}

const cartLines = document.getElementsByClassName('cart__lines');
if (cartLines.length) {
  function removeQuantitySelectors() {
    const shadowHost = document.querySelector('bq-cart-lines');
    const shadowRoot = shadowHost.shadowRoot;
    const productLines = shadowRoot.querySelector('div.bq-cart-lines');
    const productNames = productLines.getElementsByClassName('Info-hSGaRy');
    const productControls = productLines.getElementsByClassName('Controls-hdqWNE');
    Array.from(productNames).forEach((name, index) => {
      if (name.innerHTML.includes('Studio') || name.innerHTML.includes('Bedroom')) {
        const control = productControls[index];
        const selectors = control.getElementsByClassName('QuantityButton-eWxuhO');
        Array.from(selectors).forEach(selector => {
          selector.remove();
        })
        const quantityInput = control.getElementsByClassName('QuantityInput-iLtIoC');
        if (quantityInput.length) {
          quantityInput[0].remove();
        }
      }
    });
  }

  document.addEventListener("DOMContentLoaded", (event) => {
      removeQuantitySelectors();
    });
    document.addEventListener("click", (event) => {
      removeQuantitySelectors();
    });
    document.addEventListener("mousemove", (event) => {
      removeQuantitySelectors();
    });
    document.addEventListener("mouseover", (event) => {
      removeQuantitySelectors();
    });
} else {
  console.log('no cartlines');
}

const cartTotals = document.querySelector('bq-cart-totals');
if (cartTotals) {
  const shadowRoot = cartTotals.shadowRoot;
  config = { attributes: true, childList: true, subtree: true};
  const callback = (mutationList, observer) => {
    for (const mutation of mutationList) {

        console.log('listening');
        const backButton = shadowRoot.querySelector('button.Button-cnHyiR.ejMneb.bq-button');
        const buttonText = backButton.querySelector('span.Label-eIqUkL.iYUprg');
        buttonText.innerText = 'Add Moving Supplies';
        observer.disconnect();

    }
  }
  const observer = new MutationObserver(callback);
  observer.observe(shadowRoot, config);

}
// style date picker
const datePickerShadow = document.querySelector('bq-date-picker');
if (datePickerShadow) {
  let alreadyChangedCalendar = false;
  // console.log('date picker shadow');
  const shadowRoot = datePickerShadow.shadowRoot;
  const config = { attributes: true, childList: true, subtree: true };
  // console.log('one');
  const callback = (mutationList, observer) => {
    for (const mutation of mutationList) {
        // console.log('observing mutations');
        const datePicker = shadowRoot.querySelector('div.Wrapper-ijRcRr.bqrpCh');
        if (datePicker) {
          datePicker.style.backgroundColor = '#24155e';
          datePicker.style.border = '1px solid white';
          alreadyChangedCalendar = true;
          observer.disconnect();
        } else {
          // console.log('no date picker');
        }

    }
  };
  // console.log('two')
  const observer = new MutationObserver(callback);
  // console.log('three')
  observer.observe(shadowRoot, config);
  // console.log('four')
  if (!alreadyChangedCalendar) {
    setTimeout(()=>{
      if (!alreadyChangedCalendar) {
        // console.log('relying on timeout');
        const datePicker = shadowRoot.querySelector('div.Wrapper-ijRcRr.bqrpCh');
        if (datePicker) {
          datePicker.style.backgroundColor = '#24155e';
          datePicker.style.border = '1px solid white';
          alreadyChangedCalendar = true;
        } else {
          // console.log('no date picker');
        }
      }
    },2000)
  }
} else {
  // console.log('no date picker shadow');
}

const topImage = document.querySelector('div.images__description.text-medium.bq-content.rx-content');
if (topImage) {
  const tagLines = topImage.getElementsByTagName('b');
  tagLines[0].style.fontSize = '36px';
  tagLines[0].style.fontSize = '24px';
}


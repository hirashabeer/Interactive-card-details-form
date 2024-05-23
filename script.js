const cardholderName = document.getElementById("name"),
  number = document.getElementById("number"),
  expiryDate = document.getElementById("expiry-date"),
  expiryYear = document.getElementById("expiry-date-year"),
  cvc = document.getElementById("cvc"),
  allInputs = document.querySelectorAll("input[type='text']"),
  button = document.getElementById("confirm-button"),
  cardNumber = document.getElementById("numbers0"),
  cardName = document.getElementById("name0"),
  cardExpiryDate = document.getElementById("expiry0"),
  cardCvc = document.getElementById("cvc0"),
  form = document.getElementById("checkout-form"),
  completion = document.getElementById("completion");

const removeError = (inputBox) => {
  inputBox.parentElement.classList.remove("error");
  inputBox.nextElementSibling.textContent = "";
};

cardholderName.addEventListener("input", () => {
  const nameRegex = /^[a-zA-Z\s\-']+$/;
  if (cardholderName.value === "") {
    cardName.textContent = "hira shabeer";
  } else if (!nameRegex.test(cardholderName.value)) {
    cardholderName.parentElement.classList.add("error");
    cardholderName.nextElementSibling.textContent = "Wrong Format";
  } else {
    removeError(cardholderName);
    cardName.textContent = cardholderName.value.toUpperCase();
  }
});

number.addEventListener("input", () => {
  const numRegex = /^\d+$/;
  let isValid = numRegex.test(number.value); // Check if input matches regex

  if (number.value === "") {
    cardNumber.textContent = "0000 0000 0000 0000";
  } else if (!isValid) {
    number.parentElement.classList.add("error");
    number.nextElementSibling.textContent = "Wrong Format";
  }
   else {
    removeError(number);
    let formattedNumber = "";
    for (let i = 0; i < number.value.length; i++) {
      formattedNumber += number.value[i];
      if (i > 0 && (i + 1) % 4 === 0) {
        formattedNumber += " ";
      }
    }
    cardNumber.textContent = formattedNumber;
  }
});

expiryDate.addEventListener("input", () => {
  const numRegex = /^\d+$/;
  let isValid = numRegex.test(expiryDate.value); // Check if input matches regex

  if (expiryDate.value === "") {
    cardExpiryDate.textContent = "00/00";
  } else if (!isValid) {
    expiryDate.style.border = "1px solid hsl(0, 100%, 67%)";
    expiryDate.style.outline = "none ";
    expiryDate.nextElementSibling.textContent = "Wrong Format";
  } else {
    removeDateError(expiryDate);

    if (expiryDate.value.length === 1) {
      cardExpiryDate.textContent =
        "0" + expiryDate.value + cardExpiryDate.innerText.slice(2, 5);
    } else {
      cardExpiryDate.textContent =
        expiryDate.value + cardExpiryDate.innerText.slice(2, 5);
    }

  }
});

expiryYear.addEventListener("input", () => {
  const numRegex = /^\d+$/;
  let isValid = numRegex.test(expiryYear.value); // Check if input matches regex
  if (expiryYear.value === "") {
    cardExpiryDate.textContent = "00/00";
  } else if (!isValid) {
    expiryYear.style.border = "1px solid hsl(0, 100%, 67%)";
    expiryYear.style.outline = "none ";

    expiryYear.nextElementSibling.textContent = "Wrong Format";
  } else {
    removeDateError(expiryYear);
    if (expiryYear.value.length === 1) {
      cardExpiryDate.textContent =
        cardExpiryDate.innerText.slice(0, 3) + "0" + expiryYear.value;
    } else {
      cardExpiryDate.textContent =
        cardExpiryDate.innerText.slice(0, 3) + expiryYear.value;
    }
  }
});
cvc.addEventListener("input", () => {
  const numRegex = /^\d+$/;
  let isValid = numRegex.test(cvc.value); // Check if input matches regex
  if (cvc.value === "") {
    cardCvc.textContent = "000";
  } else if (!isValid) {
    cvc.parentElement.classList.add("error");
    cvc.nextElementSibling.textContent = "Wrong Format";
  } else {
    removeError(cvc);
    cardCvc.textContent = cvc.value;
  }
});

const dateError = (inputBox) => {
  inputBox.style.border = "1px solid hsl(0, 100%, 67%)";
  inputBox.nextElementSibling.textContent = "Can't be blank.";
};
const removeDateError = (inputBox) => {
  inputBox.style.border = " 1px solid var(--grey) ";

  inputBox.nextElementSibling.textContent = "";
};

button.addEventListener("click", () => {
  const inputBoxesArray = Array.from(allInputs);

  inputBoxesArray.forEach((inputBox) => {
    if (inputBox.id != expiryDate && inputBox.id != expiryYear) {
      if (inputBox.value === "") {
        inputBox.parentElement.classList.add("error");
        inputBox.nextElementSibling.textContent = "Can't be blank.";
      } else {
        removeError(inputBox); // Clear error for filled input
      }
    }
  });
  // have added  seperate validation blocks for expiry date as otherwise it
  //  will show error for both inputs when i'll add error class to parent element
  if (expiryDate.value === "") {
    dateError(expiryDate);
  } else {
    removeDateError(expiryDate);
  }

  if (expiryYear.value === "") {
    dateError(expiryYear);
  } else {
    removeDateError(expiryYear);
  }

  const allFieldsFilled =
    cardholderName.value !== "" &&
    number.value !== "" &&
    expiryDate.value !== "" &&
    expiryYear.value !== "" &&
    cvc.value !== "";

  // Only display completion if all fields are valid
  if (allFieldsFilled) {
    form.style.display = "none";
    completion.style.display = "flex";
  } else {
    // Prevent form submission and keep the form visible
    form.style.display = "flex";
    completion.style.display = "none";
  }
});

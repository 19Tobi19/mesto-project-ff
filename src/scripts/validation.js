function toggleButton(isActive, buttonElement, inactiveButtonClass) {
  buttonElement.disabled = !isActive;

  const { classList } = buttonElement;

  if (isActive) {
    classList.remove(inactiveButtonClass);
  } else {
    classList.add(inactiveButtonClass);
  }
}

function showInputError(
  formElement,
  inputElement,
  errorMessage,
  { inputErrorClass, errorClass }
) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  errorElement.classList.add(errorClass);
  errorElement.textContent = errorMessage;

  inputElement.classList.add(inputErrorClass);
}

function hideInputError(
  formElement,
  inputElement,
  { inputErrorClass, errorClass }
) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  errorElement.classList.remove(errorClass);
  errorElement.textContent = "";

  inputElement.classList.remove(inputErrorClass);
}

function isInputValid(input) {
  return input.validity.valid;
}

function isPatternMismatch(input) {
  return input.validity.patternMismatch;
}

function isFormValid(form, { inputSelector }) {
  const inputArr = Array.from(form.querySelectorAll(inputSelector));

  return inputArr.every(isInputValid);
}

function hideFormErrors(form, validationConfig) {
  const { inputSelector } = validationConfig;

  for (const input of form.querySelectorAll(inputSelector)) {
    hideInputError(form, input, validationConfig);
  }
}

function renderButton(form, validationConfig) {
  const { submitButtonSelector, inactiveButtonClass } = validationConfig;
  const buttonElement = form.querySelector(submitButtonSelector);
  const isButtonActive = isFormValid(form, validationConfig);

  toggleButton(isButtonActive, buttonElement, inactiveButtonClass);
}

function renderInput(form, input, validationConfig) {
  if (isPatternMismatch(input)) {
    input.setCustomValidity(input.dataset.errorMessage);
  } else {
    input.setCustomValidity("");
  }

  if (!isInputValid(input)) {
    showInputError(form, input, input.validationMessage, validationConfig);
  } else {
    hideInputError(form, input, validationConfig);
  }
}

function bindFormValidation(form, validationConfig) {
  const { inputSelector } = validationConfig;

  for (const input of form.querySelectorAll(inputSelector)) {
    input.addEventListener("input", () => {
      renderButton(form, validationConfig);
      renderInput(form, input, validationConfig);
    });
  }
}

function clearValidation(form, validationConfig) {
  hideFormErrors(form, validationConfig);
  renderButton(form, validationConfig);
}

function enableValidation(validationConfig) {
  const { formSelector } = validationConfig;
  const forms = document.querySelectorAll(formSelector);

  for (const form of forms) {
    bindFormValidation(form, validationConfig);
  }
}

export { enableValidation, clearValidation };

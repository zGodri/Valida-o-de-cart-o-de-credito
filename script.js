function isValidCreditCardNumber(creditCardNumber) {
    let sum = 0;
    let digitCount = 0;
    let isSecondDigit = false;

    while (creditCardNumber !== 0) {
        let digit = creditCardNumber % 10;

        if (isSecondDigit) {
            digit *= 2;
            sum += Math.floor(digit / 10) + (digit % 10);
        } else {
            sum += digit;
        }

        isSecondDigit = !isSecondDigit;
        creditCardNumber = Math.floor(creditCardNumber / 10);
        digitCount++;
    }

    return digitCount === 16 && sum % 10 === 0;
}

function validateCreditCard() {
    const creditCardInput = document.getElementById("creditCardNumber");
    const resultMessage = document.getElementById("result");

    const creditCardNumber = parseInt(creditCardInput.value);

    if (isValidCreditCardNumber(creditCardNumber)) {
        resultMessage.textContent = "Válido";
        resultMessage.style.color = "green";
    } else {
        resultMessage.textContent = "Inválido";
        resultMessage.style.color = "red";
    }
}

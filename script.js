// Lista para armazenar os números dos cartões de crédito válidos
let creditCardList = [];

document.getElementById('creditForm').addEventListener('submit', function(event) {
    event.preventDefault();
    var number = document.getElementById('creditNumber').value;

    // Verificar se o número de cartão já está na lista
    if (creditCardList.includes(number)) {
        alert("Este número de cartão já foi validado anteriormente.");
        return;
    }

    // Count the number of digits
    var digits = 0;
    var temp = number;
    while (temp > 0) {
        temp = Math.floor(temp / 10);
        digits++;
    }

    // Check if the number of digits is valid for credit card
    if (digits != 13 && digits != 15 && digits != 16) {
        document.getElementById('cardName').textContent = "";
        document.getElementById('result').textContent = "Número de Cartão Inválido";
        return;
    }

    // Calculate checksum using Luhn's algorithm
    var sum = 0;
    temp = number;
    for (var i = 0; i < digits; i++) {
        var digit = temp % 10;
        temp = Math.floor(temp / 10);
        
        if (i % 2 == 0) {
            sum += digit;
        } else {
            var doubled = digit * 2;
            sum += doubled % 10 + Math.floor(doubled / 10);
        }
    }

    // Check if the checksum is valid
    if (sum % 10 == 0) {
        // Check the starting digits to determine the card type
        let cardType;
        if ((number >= 340000000000000 && number < 350000000000000) || (number >= 370000000000000 && number < 380000000000000)) {
            cardType = "AMEX";
        } else if (number >= 5100000000000000 && number < 5600000000000000) {
            cardType = "MASTERCARD";
        } else if ((number >= 4000000000000 && number < 5000000000000) || (number >= 4000000000000000 && number < 5000000000000000)) {
            cardType = "VISA";
        } else {
            document.getElementById('cardName').textContent = "";
            document.getElementById('result').textContent = "Tipo de Cartão Não Identificado";
            return;
        }
        document.getElementById('cardName').textContent = cardType;
        document.getElementById('result').textContent = "Válido";
        document.getElementById('result').style.color = "green";

        // Adicionar o número do cartão à lista de cartões válidos
        creditCardList.push(number);

        // Atualizar a lista de cartões válidos
        updateValidCreditCards();
    } else {
        document.getElementById('cardName').textContent = "";
        document.getElementById('result').textContent = "Inválido";
        document.getElementById('result').style.color = "red";
    }
});

function updateValidCreditCards() {
    // Limpar o conteúdo do quadro
    const validCreditCardsElement = document.getElementById('validCreditCards');
    validCreditCardsElement.innerHTML = "";

    // Adicionar cada número de cartão válido ao quadro
    creditCardList.forEach(function(cardNumber) {
        const cardNumberElement = document.createElement('p');
        cardNumberElement.textContent = cardNumber;
        validCreditCardsElement.appendChild(cardNumberElement);
    });
}

let options = document.querySelectorAll(".options button");
let tipResult = document.getElementById("tipAmountPerPerson");
let totalResult = document.getElementById("totalPerPerson");
const custom = document.getElementById("custom");
const resetButton = document.getElementById("resetButton");

tipResult.innerHTML = "$0.00";
totalResult.innerHTML = "$0.00";

//Tip amount per person
function tipAmountPerPerson(option, billInput, numOfPeople) {
    const tipPercentage = option / 100;
    const _totalTip = billInput * tipPercentage;
    const totalTipPerPerson = _totalTip / numOfPeople;
    if (isNaN(totalTipPerPerson) || totalTipPerPerson === 0) {
        tipResult.innerHTML = "$0.00";
    } else {
        tipResult.innerHTML = `$${totalTipPerPerson.toFixed(2)}`;
    }
}

//Total Bill per person
function totalBillPerPerson(option, billInput, numOfPeople) {
    const tipPercentage = option / 100;
    const _totalTip = billInput * tipPercentage;
    const totalBillPerPerson = (billInput + _totalTip) / numOfPeople;
    if (isNaN(totalBillPerPerson) || totalBillPerPerson === 0) {
        totalResult.innerHTML = "$0.00";
    } else {
        totalResult.innerHTML = `$${totalBillPerPerson.toFixed(2)}`
    }
}

//Main function to calculate all
function calculateTip(optionValue) {

    const billInput = parseFloat(document.getElementById("bill").value);

    const numOfPeople = parseFloat(document.getElementById("numOfPeople").value);

    if (numOfPeople > 0) {
        tipAmountPerPerson(optionValue, billInput, numOfPeople);
        totalBillPerPerson(optionValue, billInput, numOfPeople);
    } else {
        errorHandler(numOfPeople);
    }


}


//Button click event
options.forEach((button) => {
    button.addEventListener("click", () => {

        options.forEach((button) => button.classList.remove("selected"));
        button.classList.add("selected");

        let _optionValue = parseFloat(button.innerText.replace("%", ""));
        custom.value = "";

        calculateTip(_optionValue);
    });
});


//Custom input event
custom.addEventListener("focus", handleCustomInput);
custom.addEventListener("input", handleCustomInput);

function handleCustomInput() {
    options.forEach((button) => button.classList.remove("selected"));
    let billInput = parseFloat(document.getElementById("bill").value);
    let numOfPeople = parseFloat(document.getElementById("numOfPeople").value);
    let customValue = custom.value;

    if (isNaN(customValue)) {
        tipResult.innerHTML = "$0.00";
        totalResult.innerHTML = "$0.00";
    } else {
        tipAmountPerPerson(customValue, billInput, numOfPeople);
        totalBillPerPerson(customValue, billInput, numOfPeople);
    }

    errorHandler(numOfPeople);
}


//Reset Button function
resetButton.addEventListener("click", () => {
    tipResult.innerHTML = "$0.00";
    totalResult.innerHTML = "$0.00";
    options.forEach((button) => button.classList.remove("selected"));

    let defaultButton = document.getElementById("button1");

    if (defaultButton) {
        defaultButton.classList.add("selected");
    }
});


//Error handler
function errorHandler(numOfPeople) {
    const errorMessage = document.getElementById("error-message");
    let numOfPeopleBorder = document.getElementById("numOfPeople");

    if (numOfPeople === 0) {
        errorMessage.style.display = "flex";
        errorMessage.innerText = "Can\'t be zero";
        numOfPeopleBorder.style.borderColor = "red";
        tipResult.innerHTML = "$0.00";
        totalResult.innerHTML = "$0.00";
    } else {
        errorMessage.style.display = "none";
        numOfPeopleBorder.style.borderColor = "";
    }

}



let options = document.querySelectorAll(".options button");
let totalTip = document.getElementById("tipAmountPerPerson");
let totalBill = document.getElementById("totalPerPerson");
const custom = document.getElementById("custom");
const resetButton = document.getElementById("resetButton");
const errorMessage = document.getElementById("error-message");

//default values
totalTip.textContent = "$0.00";
totalBill.textContent = "$0.00";

function totalTipPerPerson(option) {
    //bill * tip/100

    let bill = document.getElementById("bill");
    let numOfPersons = document.getElementById("numOfPeople");

    const billValue = parseFloat(bill.value);
    const personsValue = parseFloat(numOfPersons.value);
    const tip = option / 100;
    const _totalTip = (billValue * tip) / personsValue;

    if (isNaN(billValue) || isNaN(personsValue)) {
        totalTip.textContent = "$0.00";
    } else {
        totalTip.textContent = `$${_totalTip.toFixed(2)}`;
    }

    return _totalTip;
}

function totalBillPerPerson(option) {
    let bill = document.getElementById("bill");
    let numOfPersons = document.getElementById("numOfPeople");

    const billValue = parseFloat(bill.value);
    const personsValue = parseFloat(numOfPersons.value);

    const tip = option / 100;
    const _totalTip = billValue * tip;

    const _totalBill = (billValue + _totalTip) / personsValue;


    if (isNaN(billValue) || isNaN(personsValue)) {
        totalBill.textContent = "$0.00";
    } else {
        totalBill.textContent = `$${_totalBill.toFixed(2)}`;
    }

    return _totalBill;
}


function calculate(option) {
    let numOfPersons = document.getElementById("numOfPeople");
    const personsValue = parseFloat(numOfPersons.value);

    if (personsValue === 0) {
        errorMessage.style.display = 'block';
        errorMessage.textContent = "Can\'t be zero";
    } else {
        errorMessage.style.display = 'none';
        totalTipPerPerson(option);
        totalBillPerPerson(option);
    }
}

options.forEach((button) => {
    button.addEventListener("click", () => {

        options.forEach((button) => {
            button.classList.remove("selected");
        });

        button.classList.add("selected");

        const value = parseFloat(button.textContent.replace("%", ""));
        console.log(value);

        calculate(value);
    })
});

custom.addEventListener("focus", () => {
    options.forEach((button) => {
        button.classList.remove("selected");
    });
});

custom.addEventListener("input", () => {
    const customValue = parseFloat(custom.value);


    if (isNaN(customValue)) {
        totalTip.textContent = "$0.00";
        totalBill.textContent = "$0.00";
    } else {
        calculate(customValue);
    }
});

resetButton.addEventListener("click", () => {
    totalTip.textContent = "$0.00";
    totalBill.textContent = "$0.00";
})
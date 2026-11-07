
const display = document.getElementById("display");
const buttons = document.querySelectorAll(".buttons button");

let currentInput = "";
let firstNumber = null;
let operator = null;
let shouldResetDisplay = false;

// انجام محاسبات
function calculate() {
    const secondNumber = Number(currentInput);

    if (firstNumber === null || operator === null) {
        return;
    }

    let result;

    switch (operator) {
        case "+":
            result = firstNumber + secondNumber;
            break;

        case "-":
            result = firstNumber - secondNumber;
            break;

        case "×":
            result = firstNumber * secondNumber;
            break;

        case "÷":
            if (secondNumber === 0) {
                display.value = "خطا";
                currentInput = "";
                firstNumber = null;
                operator = null;
                shouldResetDisplay = true;
                return;
            }

            result = firstNumber / secondNumber;
            break;
    }

    // محدود کردن خطاهای اعشاری
    result = Number(result.toPrecision(12));

    display.value = result;
    currentInput = String(result);
    firstNumber = null;
    operator = null;
    shouldResetDisplay = true;
}

// پاک کردن نمایشگر
function clearDisplay() {
    currentInput = "";
    firstNumber = null;
    operator = null;
    display.value = "";
    shouldResetDisplay = false;
}

// حذف آخرین کاراکتر
function deleteLast() {
    if (shouldResetDisplay) {
        clearDisplay();
        return;
    }

    currentInput = currentInput.slice(0, -1);
    display.value = currentInput;
}

// وارد کردن عدد
function appendNumber(value) {
    if (shouldResetDisplay) {
        currentInput = "";
        shouldResetDisplay = false;
    }

    if (value === "." && currentInput.includes(".")) {
        return;
    }

    if (value === "." && currentInput === "") {
        currentInput = "0";
    }

    currentInput += value;
    display.value = currentInput;
}

// انتخاب عملگر
function chooseOperator(selectedOperator) {
    if (currentInput === "") {
        return;
    }

    if (firstNumber !== null && operator !== null && !shouldResetDisplay) {
        calculate();
    }

    firstNumber = Number(currentInput);
    operator = selectedOperator;
    shouldResetDisplay = true;
}

// تشخیص کلیک روی دکمه‌ها
buttons.forEach(function(button) {
    button.addEventListener("click", function() {
        const value = button.innerText;

        if (value === "AC") {
            clearDisplay();
        } 
        else if (value === "DEL") {
            deleteLast();
        } 
        else if (value === "=") {
            calculate();
        } 
        else if (["+", "-", "×", "÷"].includes(value)) {
            chooseOperator(value);
        } 
        else {
            appendNumber(value);
        }
    });
});

// پشتیبانی از کیبورد
document.addEventListener("keydown", function(event) {
    const key = event.key;

    if (key >= "0" && key <= "9") {
        appendNumber(key);
    }
    else if (key === ".") {
        appendNumber(".");
    }
    else if (key === "+") {
        chooseOperator("+");
    }
    else if (key === "-") {
        chooseOperator("-");
    }
    else if (key === "*") {
        chooseOperator("×");
    }
    else if (key === "/") {
        event.preventDefault();
        chooseOperator("÷");
    }
    else if (key === "Enter" || key === "=") {
        calculate();
    }
    else if (key === "Backspace") {
        deleteLast();
    }
    else if (key === "Escape") {
        clearDisplay();
    }
});

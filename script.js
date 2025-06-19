let expression = "";

const expressionDisplay = document.getElementById("expression");
const resultDisplay = document.getElementById("result");

function appendValue(value) {
  if (value === "π") value = "Math.PI";
  expression += value;
  expressionDisplay.textContent = expression;
}

function appendFunc(func) {
  expression += `Math.${func}`;
  expressionDisplay.textContent = expression;
}

function clearCalc() {
  expression = "";
  expressionDisplay.textContent = "";
  resultDisplay.textContent = "0";
}

function deleteLast() {
  expression = expression.slice(0, -1);
  expressionDisplay.textContent = expression;
}

function toRadians(deg) {
  return deg * (Math.PI / 180);
}

function calculate() {
  try {
    // Replace all trigonometric functions and convert input from deg to rad
    let expr = expression
      .replace(/Math\.sin\(([^)]+)\)/g, (_, g1) => `Math.sin(toRadians(${g1}))`)
      .replace(/Math\.cos\(([^)]+)\)/g, (_, g1) => `Math.cos(toRadians(${g1}))`)
      .replace(/Math\.tan\(([^)]+)\)/g, (_, g1) => `Math.tan(toRadians(${g1}))`);

    const result = Function("toRadians", `return ${expr}`)(toRadians);
    resultDisplay.textContent = result;
  } catch {
    resultDisplay.textContent = "Error";
  }
}

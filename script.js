let inputSlider = document.getElementById("inputSlider");
let sliderValue = document.getElementById("sliderValue");
let passBox = document.getElementById("passBox");
let lowercase = document.getElementById("lowercase");
let uppercase = document.getElementById("uppercase");
let numbers = document.getElementById("numbers");
let symbols = document.getElementById("symbols");
let genBtn = document.getElementById("genBtn");
let copyIcon = document.getElementById("copyIcon");

// Character sets
const lowerChars = "abcdefghijklmnopqrstuvwxyz";
const upperChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const allNumbers = "0123456789";
const allSymbols = "~!@#$%^&*";

sliderValue.textContent = inputSlider.value;

// Update display on slider change
inputSlider.addEventListener("input", () => {
  sliderValue.textContent = inputSlider.value;
});

genBtn.addEventListener("click", () => {
  passBox.value = generatePassword();
});

copyIcon.addEventListener("click", () => {
  if (passBox.value.length > 0) {
    navigator.clipboard.writeText(passBox.value);
    copyIcon.innerText = "check";
    copyIcon.title = "Password Copied";

    setTimeout(() => {
      copyIcon.innerText = "content_copy";
      copyIcon.title = "";
    }, 3000);
  }
});

function generatePassword() {
  let allChars = "";
  let password = "";

  const selectedSets = [];

  if (lowercase.checked) {
    allChars += lowerChars;
    selectedSets.push(lowerChars);
  }
  if (uppercase.checked) {
    allChars += upperChars;
    selectedSets.push(upperChars);
  }
  if (numbers.checked) {
    allChars += allNumbers;
    selectedSets.push(allNumbers);
  }
  if (symbols.checked) {
    allChars += allSymbols;
    selectedSets.push(allSymbols);
  }

  if (allChars.length === 0) return "";

  // Ensure at least one character from each selected set
  for (let set of selectedSets) {
    password += set.charAt(Math.floor(Math.random() * set.length));
  }

  // Fill remaining length
  for (let i = password.length; i < inputSlider.value; i++) {
    password += allChars.charAt(Math.floor(Math.random() * allChars.length));
  }

  // Shuffle password
  return [...password].sort(() => 0.5 - Math.random()).join("");
}

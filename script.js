const result = document.getElementById("result");
const buttons = Array.from(document.querySelectorAll("#buttons button"));
let focusedIndex = 0;

// Initialize buttons and accessibility features
buttons.forEach((btn, i) => {
  // Set initial tabindex for keyboard navigation (Roving tabindex)
  btn.setAttribute("tabindex", i === 0 ? "0" : "-1");

  // Audio feedback on mouse hover
  btn.addEventListener("mouseenter", () => {
    speak(btn.textContent);
  });

  // Audio feedback on keyboard focus
  btn.addEventListener("focus", () => {
    speak(btn.textContent);
  });

  // Audio feedback on click/activation
  btn.addEventListener("click", () => {
    speak("Added " + btn.textContent);
  });
});

// Set initial focus to the first button
buttons[0].focus();

// Appends character to the display
function appendCharacter(character) {
  result.value += character;
}

// Clears the entire input display (C button)
function clearResult() {
  result.value = "";
}

// Deletes the last character entered (< button)
function deleteLastCharacter() {
  result.value = result.value.slice(0, -1);
}

// Evaluates the mathematical expression
function calculate() {
  try {
    // Handling local decimal comma by replacing it with a dot for eval()
    const value = eval(result.value.replace(",", "."));
    result.value = value;
    
    // Delayed speech output to prevent overlap with "Added equals"
    setTimeout(() => {
      speak("Result is " + value);
    }, 800);
  } catch (error) {
    result.value = "Error";
    speak("Error");
  }
}

// Core function for Speech Synthesis (Text-to-Speech)
function speak(text) {
  window.speechSynthesis.cancel();

  const replacements = {
    "C": "Clear all",
    "<": "Delete",
    "/": "Divide",
    "*": "Multiply",
    "-": "Minus",
    "+": "Plus",
    "=": "Equals",
    ",": "Decimal",
    ".": "Decimal",
    "%": "Percent"
  };

  // Convert symbols to spoken words
  if (text.startsWith("Added ")) {
    const symbol = text.slice("Added ".length);
    const spokenSymbol = replacements[symbol] || symbol;
    text = "Added " + spokenSymbol;
  } else {
    text = replacements[text] || text;
  }

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "en-US"; // Ensuring English pronunciation
  window.speechSynthesis.speak(utterance);
}

// Speech Recognition setup (Voice commands)
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

// Initializes voice command listening
function startListening() {
  if (!SpeechRecognition) {
    alert("Your browser does not support speech recognition");
    return;
  }

  const recognition = new SpeechRecognition();
  recognition.lang = "en-US";
  recognition.start();

  recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript.toLowerCase();
    const converted = convertToMathExpression(transcript);
    result.value = converted;
    calculate();
  };

  recognition.onerror = (event) => {
    alert("An error occurred: " + event.error);
  };
}

// Maps spoken words to mathematical operators
function convertToMathExpression(speech) {
  return speech
    .replace(/multiply/g, "*")
    .replace(/plus/g, "+")
    .replace(/minus/g, "-")
    .replace(/divide/g, "/")
    .replace(/point/g, ",")
    .replace(/percent/g, "%")
    .replace(/\s/g, "")
    .replace(/one/g, "1")
    .replace(/two/g, "2")
    .replace(/three/g, "3")
    .replace(/four/g, "4")
    .replace(/five/g, "5")
    .replace(/six/g, "6")
    .replace(/seven/g, "7")
    .replace(/eight/g, "8")
    .replace(/nine/g, "9")
    .replace(/zero/g, "0");
}

// Manages keyboard focus transition
function focusButton(index) {
  buttons[focusedIndex].setAttribute("tabindex", "-1");
  focusedIndex = index;
  buttons[focusedIndex].setAttribute("tabindex", "0");
  buttons[focusedIndex].focus();
}

const cols = 4;

// Global Keyboard Listeners for Grid Navigation
document.addEventListener("keydown", (e) => {
  switch (e.key) {
    case "ArrowRight":
      e.preventDefault();
      focusButton((focusedIndex + 1) % buttons.length);
      break;

    case "ArrowLeft":
      e.preventDefault();
      focusButton((focusedIndex - 1 + buttons.length) % buttons.length);
      break;

    case "ArrowDown":
      e.preventDefault();
      focusButton((focusedIndex + cols) % buttons.length);
      break;

    case "ArrowUp": // Added ArrowUp for better navigation
      e.preventDefault();
      focusButton((focusedIndex - cols + buttons.length) % buttons.length);
      break;

    case "Enter":
    case " ":
      e.preventDefault();
      buttons[focusedIndex].click();
      break;
  }
});
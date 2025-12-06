const result = document.getElementById("result")
const buttons = Array.from(document.querySelectorAll("#buttons button"))
let focusedIndex = 0;

//postavljamo fokus na prvi dugmić
buttons.forEach((btn, i)=>{
  btn.setAttribute("tabindex", i===0 ? "0" : "-1");

  //izgovor kada pređemo mišem
  btn.addEventListener("mouseenter", ()=>{
    speak(btn.textContent)
  })

  //izgovor kada dugme dobije fokus tastaturom
  btn.addEventListener("focus", ()=>{
    speak(btn.textContent)
  })

  //izgovor kada se klikne mišem
  btn.addEventListener("click", ()=>{
    speak("Added " + btn.textContent)
  })
})

buttons[0].focus();

//dodavanje karaktera u polje rezultata
function appendCharacter(character){
  result.value += character
}

//brisanje čitavog unosa
function clearResult(){
  result.value = result.value.slice(0, -1)
}

//računanje izraza
function calculate(){
  try{
    const value = eval(result.value.replace(",", "."));
    result.value = value
    //zakašnjeli govor, da se ne sudari sa "added equals"
    setTimeout(() => {
      speak("Result is" + value)
    }, 800);
  }catch(error){
    result.value = "Error"
    speak("Error")
  }
}

//funkcija za govorni izlaz
function speak(text){
  speechSynthesis.cancel();

  const replacments = {
    "C" : "Delete all",
    "<" : "Delete",
    "/" : "Divide",
    "*" : "Multiply",
    "-" : "Minus",
    "+" : "Plus",
    "=" : "Equals",
    "," : "Decimal",
    "." : "Decimal",
    "%" : "Percent"
  };

  if(text.startsWith("Added ")){
    const symbol = text.slice(6);
    const spokenSymbol = replacments[symbol] || symbol;
    text = "Added " + spokenSymbol;
  }else{
    text = replacments[text] || text;
  }

  const utterance = new SpeechSynthesisUtterance(text);
  SpeechSynthesis.speak(utterance);
}

//prepounavanje govora
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition

//pokreće slušanje govora korisnika
function startListening(){
  if(!SpeechRecognition){
    alert("Your browser does not support speech recognition");
    return;
  }

  const recognition = new SpeechRecognition();
  recognition.lang = "en-US";
  recognition.start();

  recognition.onresult=(event)=>{
    const transcript = event.results[0][0].transcript.toLowerCase;
    const converted = convertToMathExpression(transcript);
    result.value = converted;
    calculate();
  }

  recognition.onerror=(event)=>{
    alert("An error occured: " + event.error);
  };
}

//pretvara izgovoreni  tekst u matematicki izraz
function convertToMathExpression(speech){
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
    .replace(/zero/g, "0")
}

//navigacija tastaturom kroz dugmiće
function focusButton(index){
  buttons[focusedIndex].setAttribute("tabindex", "-1");
  focusedIndex = index;
  buttons[focusedIndex].setAttribute("tabindex", "0");
  buttons[focusedIndex].focus();
}

const cols = 4;

//upravljanje tastaturom (strelice i enter/space)
document.addEventListener("keydown", (e)=>{
  switch(e.key){
    case "ArrowRight":
      e.preventDefault();
      focusButton((focusedIndex +1) % buttons.length);
      break;
    
    case "ArrowLeft":
      e.preventDefault();
      focusButton((focusedIndex -1 + buttons.length)% buttons.length);
      break;

    case "ArrowDown":
      e.preventDefault();
      focusButton((focusedIndex + cols)% buttons.length);
      break;

    case "Enter":
      case "":
        e.preventDefault();
        buttons[focusedIndex].click();
        speak("Added " + buttons[focusedIndex].textContent);
        break;
  }
})
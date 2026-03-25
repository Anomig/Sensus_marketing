// Scenario stappen
const steps = [
  {
    instruction: "Je krijgt een kort antwoord. Wat denk je dat dit betekent?",
    messages: [
      { sender: "user", text: "Hey, hoe gaat het?" },
      { sender: "other", text: "cv" }
    ],
    options: ["Enthousiast", "Neutraal", "Onzeker"]
  },
  {
    instruction: "Je merkt afstand in het gesprek. Hoe interpreteer je dit?",
    messages: [
      { sender: "user", text: "Wat ben je aan het doen?" },
      { sender: "other", text: "Bwa niets..." }
    ],
    options: [
      "Misschien is ze gewoon bezig",
      "Ze heeft waarschijnlijk geen zin om te praten",
      "Ik ben niet zeker"
    ]
  },
  {
    instruction: "Wat doe je nu?",
    messages: [
      { sender: "user", text: "Gewoon aan het niksen, moet kunnen hahaha :)" },
      { sender: "other", text: "Hahha" }
    ],
    options: ["Ik stuur nog een bericht om het gesprek voort te zetten", "Stilte laten vallen"]
  }
];

// State
let currentStep = 0;
let selections = [];
let isTyping = false;

// DOM
const instructionDiv = document.getElementById("instruction");
const chatWindow = document.getElementById("chat-window");
const chatOptions = document.getElementById("chat-options");
const restartBtn = document.getElementById("chat-restart");
const stopBtn = document.getElementById("chat-stop");

restartBtn.className = "btn-primary";
stopBtn.className = "btn-primary";

// Chat bericht toevoegen
function addMessage(text, sender) {
  const div = document.createElement("div");
  div.className = `chat-message ${sender === "user" ? "chat-user" : "chat-other"}`;
  div.textContent = text;

  chatWindow.appendChild(div);

  chatWindow.scrollTop = chatWindow.scrollHeight;
}

// Typing indicator (nu async/await → cleaner flow)
function showTyping(text) {
  return new Promise(resolve => {
    isTyping = true;

    const typingDiv = document.createElement("div");
    typingDiv.className = "chat-message chat-other typing";
    typingDiv.innerHTML = `
      <div class="typing-dot"></div>
      <div class="typing-dot"></div>
      <div class="typing-dot"></div>
    `;

    chatWindow.appendChild(typingDiv);
    chatWindow.scrollTop = chatWindow.scrollHeight;

    setTimeout(() => {
      typingDiv.remove();
      addMessage(text, "other");
      isTyping = false;
      resolve();
    }, 1200);
  });
}

// Laat stap zien (nu async)
async function showStep(stepIndex) {
  chatOptions.innerHTML = '';
  instructionDiv.setAttribute("data-step-title", `Stap ${stepIndex + 1}`);
  instructionDiv.textContent = steps[stepIndex].instruction;

  for (const msg of steps[stepIndex].messages) {
    if (msg.sender === "other") {
      await showTyping(msg.text);
    } else {
      addMessage(msg.text, "user");
      await new Promise(r => setTimeout(r, 400));
    }
  }

  renderOptions(stepIndex);
}

function renderOptions(stepIndex) {
  steps[stepIndex].options.forEach((opt, i) => {
    const btn = document.createElement("button");
    btn.textContent = opt;

    btn.className = "btn-secondary";

    btn.onclick = () => {
      if (isTyping) return;

      selections.push(i);
      currentStep++;

      chatOptions.innerHTML = '';

      if (currentStep < steps.length) {
        showStep(currentStep);
      } else {
        showCompletionStep();
      }
    };

    chatOptions.appendChild(btn);
  });
}

// Completion stap
function showCompletionStep() {
  chatOptions.innerHTML = '';

  instructionDiv.setAttribute("data-step-title", `Stap ${steps.length + 1}`);
  instructionDiv.textContent = "Klaar om af te ronden?";

  const btn = document.createElement("button");
  btn.textContent = "Bekijk resultaat";
  btn.className = "btn-primary";
  btn.onclick = showEndScreen;

  chatOptions.appendChild(btn);
}

// Eindscherm (belangrijk voor marketing!)
function showEndScreen() {
  chatOptions.innerHTML = '';
  instructionDiv.removeAttribute("data-step-title");
  instructionDiv.textContent = "Reflectie";

  chatWindow.innerHTML = '';

  const endScreen = document.createElement("div");
  endScreen.className = "end-screen";

  endScreen.innerHTML = `
    <h2>Van ervaring naar inzicht</h2>
    <p>
      In dit scenario zag je hoe kleine signalen en interpretaties een gesprek kunnen beïnvloeden.
    </p>
    <p>
      Sensus helpt leerlingen om deze situaties bewust te herkennen,
      stil te staan bij hun keuzes en respectvol te communiceren.
    </p>
  `;

  chatWindow.appendChild(endScreen);
  restartBtn.style.display = "block";
}

// Stop
stopBtn.onclick = () => {
  chatWindow.innerHTML = "<p>Scenario gestopt.</p>";
  chatOptions.innerHTML = "";
  instructionDiv.innerHTML = "";
  restartBtn.style.display = "block";
};

// Restart
restartBtn.onclick = () => {
  currentStep = 0;
  selections = [];
  chatWindow.innerHTML = '';
  chatOptions.innerHTML = '';
  instructionDiv.innerHTML = '';
  restartBtn.style.display = "none";
  showStep(currentStep);
};

// Start
showStep(currentStep);
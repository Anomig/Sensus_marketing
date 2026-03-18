// Scenario stappen
const steps = [
  {
    instruction: "Eerste contact. Hoe voel je je bij dit korte antwoord?",
    messages: [
      { sender: "user", text: "Hey, hoe gaat het?" },
      { sender: "other", text: "cv" }
    ],
    options: ["Enthousiast", "Neutraal", "Onzeker"]
  },
  {
    instruction: "Eerste signaal van afstand. Hoe lees je dit?",
    messages: [
      { sender: "user", text: "Wat ben je aan het doen?" },
      { sender: "other", text: "Bwa niets..." }
    ],
    options: ["Ze is druk", "Ze is niet geïnteresseerd", "Geen idee"]
  },
  {
    instruction: "Je eerste reactie. Wat doe je nu?",
    messages: [
      { sender: "user", text: "Gewoon aan het niksen, moet kunnen hahaha :)" },
      { sender: "other", text: "Hahha" }
    ],
    options: ["Blijven sturen", "Stilte laten vallen"]
  }
];

// State
let currentStep = 0;
let selections = [];

// DOM
const demoContainer = document.getElementById("demo-container");
const instructionDiv = document.getElementById("instruction");
const chatWindow = document.getElementById("chat-window");
const chatOptions = document.getElementById("chat-options");
const restartBtn = document.getElementById("chat-restart");
const stopBtn = document.getElementById("chat-stop");

// Chat bericht toevoegen
function addMessage(text, sender, delay = 0) {
  setTimeout(() => {
    const div = document.createElement("div");
    div.className = `chat-message ${sender === "user" ? "chat-user" : "chat-other"}`;
    div.textContent = text;
    chatWindow.appendChild(div);
    chatWindow.scrollTop = chatWindow.scrollHeight;
  }, delay);
}

// Typing indicator
function showTyping(text, callback) {
  const typingDiv = document.createElement("div");
  typingDiv.className = "chat-message chat-other typing";
  typingDiv.innerHTML = `<div class="typing-dot"></div><div class="typing-dot"></div><div class="typing-dot"></div>`;
  chatWindow.appendChild(typingDiv);
  chatWindow.scrollTop = chatWindow.scrollHeight;

  setTimeout(() => {
    typingDiv.remove();
    addMessage(text, "other");
    if(callback) callback();
  }, 1200);
}

// Laat stap zien
function showStep(stepIndex) {
  chatOptions.innerHTML = '';
  instructionDiv.setAttribute("data-step-title", `Stap ${stepIndex + 1}`);
  instructionDiv.textContent = steps[stepIndex].instruction;

  // Voeg berichten toe
  let delay = 0;
  steps[stepIndex].messages.forEach(msg => {
    if(msg.sender === "other") {
      showTyping(msg.text);
      delay += 1400;
    } else {
      addMessage(msg.text, msg.sender, delay);
      delay += 400;
    }
  });

  // Voeg keuzeknoppen toe na alle berichten
  setTimeout(() => {
    steps[stepIndex].options.forEach((opt, i) => {
      const btn = document.createElement("button");
      btn.textContent = opt;
      btn.onclick = () => {
        selections.push(i);
        currentStep++;
        chatOptions.innerHTML = '';
        if(currentStep < steps.length) {
          showStep(currentStep);
        } else {
          showFeedback();
        }
      };
      chatOptions.appendChild(btn);
    });
  }, delay);
}

// Feedback aan het einde
function showFeedback() {
  chatOptions.innerHTML = '';
  instructionDiv.textContent = "Feedback:";
  let feedback = "";
  steps.forEach((step, i) => {
    feedback += `Stap ${i+1}: ${step.options[selections[i]] ? "✅" : "⚠️"}\n`;
  });
  const pre = document.createElement("pre");
  pre.textContent = feedback;
  pre.style.whiteSpace = "pre-wrap";
  chatWindow.appendChild(pre);
  chatWindow.scrollTop = chatWindow.scrollHeight;
  restartBtn.style.display = "inline-block";
}

// Stop knop
stopBtn.onclick = () => {
  chatWindow.innerHTML = "<p>Scenario gestopt.</p>";
  chatOptions.innerHTML = "";
  instructionDiv.innerHTML = "";
  restartBtn.style.display = "inline-block";
};

// Restart knop
restartBtn.onclick = () => {
  currentStep = 0;
  selections = [];
  chatWindow.innerHTML = '';
  chatOptions.innerHTML = '';
  instructionDiv.innerHTML = '';
  restartBtn.style.display = "none";
  showStep(currentStep);
};

// Start demo
showStep(currentStep);
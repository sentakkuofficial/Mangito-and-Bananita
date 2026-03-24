const consoleEl = document.getElementById("console");
const lineNumbersEl = document.getElementById("lineNumbers");

let step = -1;
let choice1 = "";
let choice2 = "";
let choice3 = "";
let isAnimating = false;

function renderLineNumbers() {
  lineNumbersEl.innerHTML = "";
  for (let i = 1; i <= 38; i++) {
    const num = document.createElement("div");
    num.textContent = i;
    lineNumbersEl.appendChild(num);
  }
}

function scrollConsole() {
  consoleEl.scrollTop = consoleEl.scrollHeight;
}

function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function addLine(text = "", className = "muted") {
  const line = document.createElement("div");
  line.className = `console-line ${className}`;
  line.textContent = text;
  consoleEl.appendChild(line);
  scrollConsole();
  return line;
}

async function typeLine(text, className = "story", speed = 16) {
  const line = document.createElement("div");
  line.className = `console-line ${className}`;

  const textSpan = document.createElement("span");
  const cursor = document.createElement("span");
  cursor.className = "console-cursor";

  line.appendChild(textSpan);
  line.appendChild(cursor);
  consoleEl.appendChild(line);
  scrollConsole();

  for (let i = 0; i < text.length; i++) {
    textSpan.textContent += text[i];
    scrollConsole();
    await wait(speed);
  }

  cursor.remove();
  return line;
}

function addInput(callback) {
  const row = document.createElement("div");
  row.className = "console-input-row";

  const prompt = document.createElement("span");
  prompt.className = "console-prompt";
  prompt.textContent = ">";

  const input = document.createElement("input");
  input.type = "text";
  input.className = "console-input";
  input.autocomplete = "off";
  input.spellcheck = false;

  row.appendChild(prompt);
  row.appendChild(input);
  consoleEl.appendChild(row);

  input.focus();
  scrollConsole();

  input.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      const value = input.value.trim().toLowerCase();
      row.remove();
      addLine("> " + value, "input");
      callback(value);
    }
  });
}

function showStartScreen() {
  step = -1;
  choice1 = "";
  choice2 = "";
  choice3 = "";
  isAnimating = false;

  consoleEl.innerHTML = "";

  const line = document.createElement("div");
  line.className = "console-line brand";
  line.innerHTML =
    'Click <span class="run-link" id="runLink">RUN</span> to preview the final project you will build.';
  consoleEl.appendChild(line);

  const runLink = document.getElementById("runLink");
  runLink.addEventListener("click", startProgram);

  scrollConsole();
}

async function startProgram() {
  if (isAnimating) return;

  isAnimating = true;
  step = 0;
  consoleEl.innerHTML = "";

  await typeLine("Mangito & Bananita: Part 1 — The Fall", "brand");
  await typeLine("Be careful who you make sacrifices for.", "story");
  addLine("", "muted");

  await typeLine("Mangito had nothing.", "story");
  await typeLine("No money. No direction. No future.", "story");
  await typeLine("But Bananita believed in him.", "story");
  await typeLine("She worked, saved, and sacrificed everything...", "story");
  await typeLine("just so Mangito could go to law school.", "story");
  await typeLine("She paid for his tuition, his books, even his food.", "story");
  addLine("", "muted");

  await typeLine("Mangito made it.", "story");
  await typeLine("He became successful. Rich. Respected.", "story");
  await typeLine("And then...", "story");
  await typeLine("he disappeared.", "story");
  addLine("", "muted");

  await typeLine("One day, Bananita discovers the truth.", "story");
  await typeLine("Mangito married Cherita.", "bad");
  await typeLine("Bananita was erased like she never existed.", "bad");
  addLine("", "muted");

  await askChoice(
    "You see Mangito again for the first time. Type 'approach' or 'avoid'.",
    handleChoice1
  );

  isAnimating = false;
}

async function askChoice(question, handler) {
  await typeLine(question, "question");
  addInput(handler);
}

async function handleChoice1(value) {
  choice1 = value;

  if (choice1 === "avoid") {
    isAnimating = true;
    await typeLine("You avoided him.", "story");
    await typeLine("He didn't even notice you.", "bad");
    await typeLine("Years of sacrifice meant nothing.", "bad");
    await typeLine("You're left alone.", "bad");
    await typeLine("Game over.", "bad");
    isAnimating = false;
    return;
  }

  if (choice1 === "approach") {
    isAnimating = true;
    await typeLine("You approached him.", "story");
    await typeLine("He looks at you... confused.", "story");
    await askChoice(
      "Do you type 'remind' or 'stayquiet'?",
      handleChoice2
    );
    isAnimating = false;
    return;
  }

  isAnimating = true;
  await typeLine("That wasn't a valid choice. Part 1 ends here.", "bad");
  isAnimating = false;
}

async function handleChoice2(value) {
  choice2 = value;

  if (choice2 === "stayquiet") {
    isAnimating = true;
    await typeLine("You stayed quiet.", "story");
    await typeLine("He ignored you completely.", "bad");
    await typeLine("Game over.", "bad");
    isAnimating = false;
    return;
  }

  if (choice2 === "remind") {
    isAnimating = true;
    await typeLine("You tried to remind him.", "story");
    await typeLine("He laughs.", "bad");
    await typeLine("Acts like you're a stranger.", "bad");
    await askChoice(
      "Do you type 'beg' or 'leave'?",
      handleChoice3
    );
    isAnimating = false;
    return;
  }

  isAnimating = true;
  await typeLine("That wasn't a valid choice. Part 1 ends here.", "bad");
  isAnimating = false;
}

async function handleChoice3(value) {
  choice3 = value;
  isAnimating = true;

  if (choice3 === "beg") {
    await typeLine("You begged him.", "story");
    await typeLine("He walks away.", "bad");
    await typeLine("You're left there... with nothing.", "bad");
    await typeLine("Game over.", "bad");
    isAnimating = false;
    return;
  }

  if (choice3 === "leave") {
    await typeLine("You left.", "story");
    await typeLine("Silently. Broken.", "story");
    await typeLine("But something inside you changes.", "result");
    await typeLine("To be continued...", "result");
    isAnimating = false;
    return;
  }

  await typeLine("That wasn't a valid choice. Part 1 ends here.", "bad");
  isAnimating = false;
}

renderLineNumbers();
showStartScreen();

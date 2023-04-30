let previousPhasePeriodDate = document.getElementById("lastPhasePeriod");
let actualPhaseDuration = document.getElementById("phaseDuration");
let nextPhasePeriodDate = document.getElementById("nextPhasePeriod");
let visibilidadeLua = document.getElementById("moonVisibility");
let distanciaLua = document.getElementById("moonDistance");
let remainingDaysActual = document.getElementById("remainingDays");
let currentPhaseStartedOn;
let currentPhaseEndsOn;
let currentPhase;
let epoch;
let currentEpoch;
let daysSinceEpoch;
let daysIntoCycle;
let currentPhaseIndex;
let timeInCurrentPhase;
let timeSincePreviousPhase;
let previousPhaseIndex;
let previousPhase;
let nextPhaseIndex;
let nextPhase;
let nextPhaseStartsOn;
let timeUntilNextPhase;
let timeUntilNextPhaseInDays;
let timeUntilNextPhaseInHours;
let daysOfPhases = 29.53 / 4;

const now = new Date();
const oneDay = 24 * 60 * 60 * 1000; // em milissegundos
const oneHour = 1000 * 60 * 60; // em milissegundos

const phaseNames = ["Lua Nova", "Lua Crescente", "Lua Cheia", "Lua Minguante"];

function getMoonPhase() {
  epoch = new Date("2000-01-06 22:14:00 GMT").getTime();
  currentEpoch = now.getTime();
  daysSinceEpoch = (currentEpoch - epoch) / oneDay;
  daysIntoCycle = daysSinceEpoch % 29.53;

  currentPhaseIndex = Math.floor((daysIntoCycle / 29.53) * 4);
  currentPhase = phaseNames[currentPhaseIndex];
  currentPhaseStartedOn = new Date(
    currentEpoch - (7.3825 - (29.53 - daysIntoCycle)) * oneDay
  );
  currentPhaseEndsOn = new Date(
    currentEpoch + (29.53 - daysIntoCycle) * oneDay
  );
  timeInCurrentPhase = now - currentPhaseStartedOn;

  previousPhaseIndex = currentPhaseIndex === 0 ? 3 : currentPhaseIndex - 1;
  previousPhase = phaseNames[previousPhaseIndex];
  timeSincePreviousPhase =
    now - new Date(now.getFullYear(), now.getMonth(), now.getDate());

  nextPhaseIndex = currentPhaseIndex === 3 ? 0 : currentPhaseIndex + 1;
  nextPhase = phaseNames[nextPhaseIndex];
  nextPhaseStartsOn = new Date(currentEpoch + (29.53 - daysIntoCycle) * oneDay);
  timeUntilNextPhase = nextPhaseStartsOn - now;
  timeUntilNextPhaseInDays = Math.floor(timeUntilNextPhase / oneDay);
  timeUntilNextPhaseInHours = Math.floor(
    (timeUntilNextPhase % oneDay) / (60 * 60 * 1000)
  );

  return {
    currentPhase,
    currentPhaseStartedOn,
    timeInCurrentPhase: formatTime(timeInCurrentPhase),
    previousPhase,
    timeSincePreviousPhase: formatTime(timeSincePreviousPhase),
    nextPhase,
    nextPhaseStartsOn,
    timeUntilNextPhaseInDays,
    timeUntilNextPhaseInHours,
    currentPhaseEndsOn,
  };
}

function getMoonPhaseData() {
  const currentPhaseIndex = Math.floor((daysIntoCycle / 29.53) * 4);
  const currentPhase = phaseNames[currentPhaseIndex];
  const currentPhaseStartedOn = new Date(
    now - (7.3825 - (29.53 - daysIntoCycle)) * oneDay
  );
  const currentPhaseEndsOn = new Date(
    now.getTime() + (29.53 - daysIntoCycle) * oneDay
  );
  const timeInCurrentPhase = now - currentPhaseStartedOn;

  const previousPhaseIndex =
    currentPhaseIndex === 0 ? 3 : currentPhaseIndex - 1;
  const previousPhase = phaseNames[previousPhaseIndex];
  const previousPhaseEndsOn = new Date(
    now.getTime() - (daysIntoCycle - currentPhaseIndex * 7.3825) * oneDay
  );
  const previousPhaseStartedOn = new Date(
    previousPhaseEndsOn.getTime() - 7.3825 * oneDay
  );
  const previousPhaseDuration = formatTime(
    previousPhaseEndsOn - previousPhaseStartedOn
  );

  const nextPhaseIndex = currentPhaseIndex === 3 ? 0 : currentPhaseIndex + 1;
  const nextPhase = phaseNames[nextPhaseIndex];
  const nextPhaseStartsOn = new Date(
    now.getTime() + (29.53 - daysIntoCycle) * oneDay
  );
  const nextPhaseEndsOn = new Date(
    nextPhaseStartsOn.getTime() + 7.3825 * oneDay
  );

  const currentPhaseDaysRemaining = formatTime(currentPhaseEndsOn - now);

  return {
    currentPhaseDaysRemaining,
    previousPhasePeriod:
      previousPhaseStartedOn.toLocaleDateString() +
      " até " +
      previousPhaseEndsOn.toLocaleDateString(),
    previousPhaseDuration,
    nextPhasePeriod:
      nextPhaseStartsOn.toLocaleDateString() +
      " até " +
      nextPhaseEndsOn.toLocaleDateString(),
  };
}

function defineImgLast() {
  if (document.getElementById("nameLastPhase").textContent == "Lua Cheia") {
    lastImg.src = "../img/lua-cheia.png";
    lastImg.alt = "Foto da Lua Cheia";
    lastImg.title = "Foto da Lua Cheia";
  } else if (
    document.getElementById("nameLastPhase").textContent == "Lua Nova"
  ) {
    lastImg.src = "../img/lua-nova.png";
    lastImg.alt = "Foto da Lua Nova";
    lastImg.title = "Foto da Lua Nova";
    lastImg.style.scale = "0.9";
  } else if (
    document.getElementById("nameLastPhase").textContent == "Lua Minguante"
  ) {
    lastImg.src = "../img/lua-minguante.png";
    lastImg.alt = "Foto da Lua Minguante";
    lastImg.title = "Foto da Lua Minguante";
  } else {
    lastImg.src = "../img/lua-crescente.png";
    lastImg.alt = "Foto da Lua Crescente";
    lastImg.title = "Foto da Lua Crescente";
  }
}

function defineImgNext() {
  if (document.getElementById("nextPhase").textContent == "Lua Cheia") {
    nextImg.src = "../img/lua-cheia.png";
    nextImg.alt = "Foto da Lua Cheia";
    nextImg.title = "Foto da Lua Cheia";
  } else if (document.getElementById("nextPhase").textContent == "Lua Nova") {
    nextImg.src = "../img/lua-nova.png";
    nextImg.alt = "Foto da Lua Nova";
    nextImg.title = "Foto da Lua Nova";
    nextImg.style.scale = "0.9";
  } else if (
    document.getElementById("nextPhase").textContent == "Lua Minguante"
  ) {
    nextImg.src = "../img/lua-minguante.png";
    nextImg.alt = "Foto da Lua Minguante";
    nextImg.title = "Foto da Lua Minguante";
  } else if (
    document.getElementById("nextPhase").textContent == "Lua Crescente"
  ) {
    nextImg.src = "../img/lua-crescente.png";
    nextImg.alt = "Foto da Lua Crescente";
    nextImg.title = "Foto da Lua Crescente";
  }
}

function defineImgActual() {
  if (document.getElementById("actualPhase").textContent == "Lua Cheia") {
    actualImg.src = "../img/lua-cheia.png";
    actualImg.alt = "Foto da Lua Cheia";
    actualImg.title = "Foto da Lua Cheia";
  } else if (document.getElementById("actualPhase").textContent == "Lua Nova") {
    actualImg.src = "../img/lua-nova.png";
    actualImg.alt = "Foto da Lua Nova";
    actualImg.title = "Foto da Lua Nova";
    actualImg.style.scale = "0.9";
  } else if (
    document.getElementById("actualPhase").textContent == "Lua Minguante"
  ) {
    actualImg.src = "../img/lua-minguante.png";
    actualImg.alt = "Foto da Lua Minguante";
    actualImg.title = "Foto da Lua Minguante";
  } else if (
    document.getElementById("actualPhase").textContent == "Lua Crescente"
  ) {
    actualImg.src = "../img/lua-crescente.png";
    actualImg.alt = "Foto da Lua Crescente";
    actualImg.title = "Foto da Lua Crescente";
  }
}

function formatTime(time) {
  const days = Math.floor(time / oneDay);
  const hours = Math.floor((time % oneDay) / (60 * 60 * 1000));

  return `${days} dias e ${hours} horas`;
}

let lastLunarPhase = document.getElementById("nameLastPhase");
let lastImg = document.getElementById("lastIMG");

let actualLunarPhase = document.getElementById("actualPhase");
let actualImg = document.getElementById("actualIMG");

let nextLunarPhase = document.getElementById("nextPhase");
let nextImg = document.getElementById("nextIMG");

const moonPhase = getMoonPhase();

function adicionaZero(numero) {
  if (numero <= 9) return "0" + numero;
  else return numero;
}

actualLunarPhase.innerHTML = moonPhase.currentPhase;
lastLunarPhase.innerHTML = moonPhase.previousPhase;
nextLunarPhase.innerHTML = moonPhase.nextPhase;
defineImgActual();
defineImgLast();
defineImgNext();

function getMoonPhaseDetails() {
  const daysSinceEpoch = (currentEpoch - epoch) / oneDay;
  const degreesIntoCycle = ((daysSinceEpoch * 360) / 29.53) % 360;

  const distance = 385000 - 4450 * Math.cos((degreesIntoCycle * Math.PI) / 180);
  const visibility =
    100 - ((1 + Math.cos((degreesIntoCycle * Math.PI) / 180)) / 2) * 100;

  return {
    distance: distance.toFixed(0),
    visibility: visibility.toFixed(0),
  };
}

let moonPhaseData = getMoonPhaseData();

previousPhasePeriodDate.innerHTML =
  "Período da Fase " + moonPhaseData.previousPhasePeriod;
remainingDaysActual.innerHTML =
  "Tempo até o próximo ciclo: " + moonPhaseData.currentPhaseDaysRemaining;
nextPhasePeriodDate.innerHTML =
  "Tempo Restante: " + moonPhaseData.nextPhasePeriod;
actualPhaseDuration.innerHTML =
  "Período da Fase: " +
  adicionaZero(currentPhaseStartedOn.getDate()) +
  "/" +
  adicionaZero(currentPhaseStartedOn.getMonth() + 1) +
  "/" +
  currentPhaseStartedOn.getFullYear() +
  " a " +
  adicionaZero(currentPhaseEndsOn.getDate()) +
  "/" +
  adicionaZero(currentPhaseEndsOn.getMonth() + 1) +
  "/" +
  currentPhaseEndsOn.getFullYear();
const moonPhaseDetails = getMoonPhaseDetails();
distanciaLua.innerHTML = "Distância: " + moonPhaseDetails.distance + "Km";
visibilidadeLua.innerHTML =
  "Visibilidade: " + moonPhaseDetails.visibility + "%";

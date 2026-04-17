const input = document.getElementById("state-input");
const button = document.getElementById("fetch-alerts");
const display = document.getElementById("alerts-display");
const errorEl = document.getElementById("error-message");

const weatherApi = "https://api.weather.gov/alerts/active?area=";


document.addEventListener("DOMContentLoaded", () => {
  button.addEventListener("click", handleFetch);
});

async function handleFetch() {
  const state = input.value.trim().toUpperCase();

  
  errorEl.textContent = "";
  errorEl.classList.add("hidden");
  display.innerHTML = "";

  try {
    if (!/^[A-Z]{2}$/.test(state)) {
      throw new Error("Invalid state code");
    }

    const response = await fetch(weatherApi + state);

    if (!response.ok) {
      throw new Error("Network failure");
    }

    const data = await response.json();

    renderAlerts(data);

    
    input.value = "";

  } catch (err) {
    showError(err.message);
  }
}

function renderAlerts(data) {
  const features = data.features || [];

  const header = document.createElement("h2");
  header.textContent = `Weather Alerts: ${features.length}`;
  display.appendChild(header);

  const list = document.createElement("ul");

  features.forEach(item => {
    const li = document.createElement("li");
    li.textContent = item?.properties?.headline;
    list.appendChild(li);
  });

  display.appendChild(list);
}

function showError(message) {
  errorEl.textContent = message;
  errorEl.classList.remove("hidden"); 
}
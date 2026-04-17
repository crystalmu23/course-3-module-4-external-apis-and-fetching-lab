const weatherApi = "https://api.weather.gov/alerts/active?area=";

async function fetchWeatherAlerts(stateAbbr) {
  try {
    errorEl.textContent = "";
    errorEl.classList.add("hidden");
    display.innerHTML = "";

    const response = await fetch(weatherApi + stateAbbr);

    if (!response.ok) {
      throw new Error("Failed to fetch weather alerts.");
    }

    const data = await response.json();
    console.log(data);

    displayAlerts(data, stateAbbr);

    input.value = "";

  } catch (err) {
    console.log(err.message);
    showError(err.message);
  }
}
function toCelsius(kelvin) {
  return kelvin - 273.15;
}

class Form {
  static getInputValue() {
    const input = document.querySelector('input');
    return input.value;
  }

  static clearField() {
    const input = document.querySelector('input');
    input.value = '';
  }
}

class UI {
  static createForm(selector = '.container') {
    const container = document.querySelector(selector);
    const form = document.createElement('form');
    const label = document.createElement('label');
    const input = document.createElement('input');
    const button = document.createElement('button');
    [label, input, button].forEach((element) => form.appendChild(element));
    container.appendChild(form);

    input.id = 'city-input';
    input.setAttribute('required', '');
    button.innerText = 'Search';
    label.innerText = 'City name';
    label.setAttribute('for', 'city-input');
  }
  static display(...data) {
    const display = document.querySelector('.display');
    // reset display
    display.innerText = '';
    // add data to display
    for (const information of data) {
      display.innerText += ` ${information}`;
    }
  }
}

class Storage {}

class Weather {
  constructor(cityName, degrees) {
    this.cityName = cityName;
    this.degrees = degrees;
  }
  static;
}

async function getWeather(city) {
  try {
    UI.display('Loading data');
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=b5438f36d7a5a5bea321ad89a86f6a8c`
    );
    const weatherToday = await response.json();
    await new Promise((resolve) => setTimeout(resolve, 1000));
    UI.display(
      weatherToday.name,
      `${toCelsius(weatherToday.main.temp).toFixed()} degrees`
    );
  } catch (error) {
    UI.display(`I can't find city named ${city}
    `);
    console.log();
  }
}

// Event listeners

document.addEventListener('submit', (event) => {
  event.preventDefault();
  const city = Form.getInputValue();
  getWeather(city);
  Form.clearField();
});

UI.createForm();

// DELETE LATER!:

function tryTest() {
  try {
    fetch('not working fetch');
  } catch (error) {
    console.log('error');
  }
}
tryTest();

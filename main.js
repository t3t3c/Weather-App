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

  static async displayGif(input) {
    try {
      const display = document.querySelector('.display');
      const img = document.createElement('img');
      const response = await fetch(
        `https://api.giphy.com/v1/gifs/translate?api_key=Qzz0xN1HK9JfOpgajfm8CWKCVfdnYPtI&s=${input}`,
        { mode: 'cors' }
      );
      const data = await response.json();
      img.src = data.data.images.original.url;
      display.appendChild(img);
    } catch (error) {
      console.log('error');
    }
  }
}

class Storage {}

class CityWeather {
  constructor(name, degrees, weather) {
    this.name = name;
    this.degrees = degrees;
    this.weather = weather;
  }
}

async function getWeather(city) {
  try {
    UI.display('Loading data');
    // Load data
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=b5438f36d7a5a5bea321ad89a86f6a8c`
    );
    const weatherToday = await response.json();
    await new Promise((resolve) => setTimeout(resolve, 1000));
    // arrange data:
    const currentCity = new CityWeather(
      weatherToday.name,
      toCelsius(weatherToday.main.temp).toFixed(),
      weatherToday.weather[0].description
    );
    // display data
    UI.display(
      currentCity.name,
      `${currentCity.degrees} degrees`,
      '\n',
      currentCity.weather
    );
    UI.displayGif(currentCity.weather);
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

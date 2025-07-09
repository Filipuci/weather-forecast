const weatherContainer = document.querySelector('.weather-container')
const input = document.querySelector('#search-bar input')
const form = document.querySelector('#search-bar')
const alert = document.querySelector('#alert-box')

// Constantes para atualizar os elementos
const cityNameEl = document.querySelector('.weather-header h2')
const weatherIconEl = document.querySelector('.weather-icon img')
const tempValueEl = document.querySelector('.weather-temperature h1')
const tempDescriptionEl = document.querySelector('.weather-temperature p')
const tempMaxEl = document.querySelector('#temp-max')
const tempMinEl = document.querySelector('#temp-min')
const humidityEl = document.querySelector('#humidity')
const windEl = document.querySelector('#wind')

form.addEventListener('submit', e => {
  e.preventDefault()
  if (input.value.trim() !== '') {
    const cityInput = input.value
    fetchWeather(cityInput)
    input.value = ''
  }
})

const fetchWeather = async (city) => {
  try {
    const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(city)}&appid=79789bb2092e789323ae30c021492cce&units=metric&lang=pt_br`)
    if (!res.ok) throw new Error('Não foi possível encontrar essa localização')
    const data = await res.json()
    renderInfos(data)
    weatherContainer.style.display = 'block'
    alert.style.display = 'none'
  }
  catch (err) {
    alert.style.display = 'flex'
    weatherContainer.style.display = 'none'
    return null
  }
}

const renderInfos = (info) => {
  if (!info) return
  cityNameEl.textContent = `${info.name}, ${info.sys.country}`
  weatherIconEl.src = `http://openweathermap.org/img/wn/${info.weather[0].icon}@2x.png`
  tempValueEl.innerHTML = `${Math.floor(info.main.temp)} <sup>°C</sup>`
  tempDescriptionEl.textContent = capitalize(info.weather[0].description)
  tempMaxEl.textContent = `${info.main.temp_max.toFixed(1)} °C`
  tempMinEl.textContent = `${info.main.temp_min.toFixed(1)} °C`
  humidityEl.textContent = `${info.main.humidity}%`
  windEl.textContent = `${info.wind.speed.toFixed(1)}km/h`
}


const capitalize = str => str.charAt(0).toUpperCase() + str.slice(1)
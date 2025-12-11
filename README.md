# 🌤 Whether.io — Weekly Weather Forecast Explorer

A modern, fast, and beautifully designed weather forecasting tool built with **React**, **TypeScript**, **Chart.js**, and **CSS Modules**.  
Pick a weekday, select a city, and explore the weather forecast for the next 10 matching days — complete with charts, icons, and smart weather summaries.

## PREVIEW: https://effulgent-sorbet-58a721.netlify.app/    

## 🚀 Getting Started

### 1. Install dependencies
```sh
npm install
```


---

## ✨ Features

### 🔍 Smart Location Autocomplete
- Powered by the **Open-Meteo Geocoding API**
- Debounced search for smooth input  
- Clean, accessible dropdown UI  
- Selecting a location instantly refreshes forecasts  

---

### 📅 Weekly Forecast Explorer
- Choose any weekday (Mon–Sun)  
- App automatically generates the **next 10 occurrences** of that weekday  
- Fetches weather using **one optimized Visual Crossing API range request**  
- Renders days inside a smooth **React Slick carousel**  

---

### 📊 Interactive Weather Charts
Built with **Chart.js + react-chartjs-2**:

- Temperature (°F)  
- Wind speed (mph)  
- Humidity (%)  
- Tooltips and hover indicators  
- Theming matches the app’s design system  

---

### 🧠 Smart Weather Insights
Each forecast includes an auto-generated description such as:

- 🌦 *High chance of rain — consider backup plans*  
- ❄️ *Chilly — bring layers*  
- 🌞 *Nice day for a meetup*  
- 💨 *Breezy afternoon*

Descriptions are algorithmically generated from:

- Temperature  
- Rain probability  
- Wind speed  
- Humidity  

---

### 🌤 Matching Weather Icons
Icons dynamically change based on conditions:

- ☀️ Sunny  
- ⛅ Partly cloudy  
- 🌧 Rainy  
- 🌨 Snowy  
- 💨 Windy  

---

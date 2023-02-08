import React, { useState, useEffect } from "react";
import Loading from "./components/Loading";
const api = {
  key: "d89de10aaaab50f70ac6716d0d16fd5d",
  base: "https://api.openweathermap.org/data/2.5/",
};

function App() {
  const [searchInput, setSearchInput] = useState("");
  const [searchCity, setSearchCity] = useState("");
  const [weatherInfo, setWeatherInfo] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  useEffect(() => {
    document.title = "Weather App";
  }, []);

  useEffect(() => {
    const fetchWeatherData = async () => {
      if (!searchCity) return;
      setLoading(true);
      //Process
      try {
        const url = `${api.base}weather?q=${searchCity}&units=metric&appID=${api.key}`;
        const response = await fetch(url);
        const data = await response.json();
        if (response.ok) {
          setWeatherInfo(
            <div className="location">
              <div className="city">
                {data.name}, {data.sys.country}
              </div>
              <div className="temp"> {data.main.temp}°C</div>
              <div className="description">{data.weather[0].description}</div>
              <div className="hi-low">
                {data.main.temp_max}°C / {data.main.temp_min}°C
              </div>
            </div>
          );
          setErrorMsg("");
        } else {
          setErrorMsg(data.message);
        }
      } catch (error) {
        setErrorMsg(error.message);
      }
      setLoading(false);
    };
    fetchWeatherData();
  }, [searchCity]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSearchCity(searchInput);
  };
  return (
    <div className="container">
      <form className="searchForm" onSubmit={handleSubmit} autoComplete="off">
        <input
          type="text"
          placeholder="City"
          id="inputBox"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
        <button className="searchBtn">Search</button>
      </form>
      <Loading
        weatherInfo={weatherInfo}
        loading={loading}
        errorMsg={errorMsg}
      />
    </div>
  );
}

export default App;

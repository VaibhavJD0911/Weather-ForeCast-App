import { useState } from "react";
import "boxicons/css/boxicons.min.css";
import "./forecast.css";

const WEEK_DAYS = [
  "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday",
];

const getWeatherIcon = (desc) => {
  const d = desc.toLowerCase();
  if (d.includes("clear")) return "bx bx-sun";
  if (d.includes("cloud") && d.includes("few")) return "bx bxs-cloud-sun";
  if (d.includes("cloud")) return "bx bx-cloud";
  if (d.includes("rain") && d.includes("light")) return "bx bx-cloud-light-rain";
  if (d.includes("rain")) return "bx bx-cloud-rain";
  if (d.includes("thunder")) return "bx bx-cloud-lightning";
  if (d.includes("snow")) return "bx bx-cloud-snow";
  if (d.includes("mist") || d.includes("fog")) return "bx bx-water";
  return "bx bx-cloud";
};

function Forecast({ data }) {
  const [expandedIndex, setExpandedIndex] = useState(null);

  const dayInWeek = new Date().getDay();
  const forecastDays = WEEK_DAYS.slice(dayInWeek).concat(WEEK_DAYS.slice(0, dayInWeek));

  const toggleExpand = (idx) => {
    setExpandedIndex(expandedIndex === idx ? null : idx);
  };

  return (
    <>
      <label className="title">Weather Forecast</label>

      <div className="forecast-grid">
        {data.list.slice(0, 7).map((item, idx) => (
          <div
            key={idx}
            className="forecast-card"
            onClick={() => toggleExpand(idx)}
          >
            <div className="forecast-day">{forecastDays[idx]}</div>

            <i className={`${getWeatherIcon(item.weather[0].description)} forecast-icon`} />

            <div className="forecast-temp">
              {Math.round(item.main.temp_min)}° / {Math.round(item.main.temp_max)}°
            </div>

            <div className="forecast-description">
              {item.weather[0].description}
            </div>

            {expandedIndex === idx && (
              <div className="forecast-details">
                <div className="forecast-detail-item">
                  <span className="forecast-detail-label">Humidity</span>
                  <span className="forecast-detail-value">{item.main.humidity}%</span>
                </div>
                <div className="forecast-detail-item">
                  <span className="forecast-detail-label">Wind</span>
                  <span className="forecast-detail-value">{item.wind.speed} m/s</span>
                </div>
                <div className="forecast-detail-item">
                  <span className="forecast-detail-label">Pressure</span>
                  <span className="forecast-detail-value">{item.main.pressure} hPa</span>
                </div>
                <div className="forecast-detail-item">
                  <span className="forecast-detail-label">Feels Like</span>
                  <span className="forecast-detail-value">{Math.round(item.main.feels_like)}°</span>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  );
}

export default Forecast;

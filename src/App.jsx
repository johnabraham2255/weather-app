import { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';

function App() {
  const [data, setData] = useState('');
  const [climate, setWeather] = useState({});
  const clouds = [
    { weather: 'clear sky', image: '../public/clearsky.jpg' },
    { weather: 'few clouds', image: '../public/fewclouds.jpg' },
    { weather: 'light rain', image: '../public/lightrain.jpg' },
    { weather: 'broken clouds', image: '../public/brokenclouds.jpg' },
    { weather: 'scattered clouds', image: '../public/scattered.jpg' },
    { weather: 'overcast clouds', image: '../public/overcast.jpg' },
  ];

  async function getWeather() {
    if (data !== '') {
      const res = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${data}&appid=5bcecea32593fe25da881b2cb40ae846`);
      setWeather(res.data);
    } else {
      alert('Enter the city');
    }
  }

  useEffect(() => {
    async function getKochi() {
      const kochiRes = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=kochi&appid=5bcecea32593fe25da881b2cb40ae846`);
      setWeather(kochiRes.data);
    }
    getKochi();
  }, []);

  return (
    <>
      <section className="vh-100 " style={{backgroundImage:climate.weather ? `url(${clouds.find(item => item.weather === climate.weather[0].description)?.image})` : ``,backgroundSize:'cover',backgroundPosition:'center'}}>
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-md-8 col-lg-6 col-xl-4">
              <h3 className="mb-4 pb-2 fw-normal">Check the weather forecast</h3>
              <div className="input-group rounded mb-3">
                <input
                  type="search"
                  className="search form-control rounded opacity-50"
                  onChange={(e) => setData(e.target.value)}
                  placeholder="City"
                  aria-label="Search"
                  aria-describedby="search-addon"
                />
                
                  <button className="input-group-text border-0 fw-bold opacity-50" onClick={getWeather} id="search-addon">
                    Check!
                  </button>
                
              </div>
              <div className="card  shadow-sm p-3 mb-5  border" style={{ borderRadius: '40px' }}>
                <div className="card-white-overlay text-dark p-4 " >
                  <h4 className="mb-1 sfw-normal">{climate.name},{climate.sys && climate.sys.country}</h4>
                  <p className="mb-2">
                    Current temperature: <strong>{Math.floor(((climate.main && climate.main.temp) - 273.15) * 100) / 100}°C</strong>
                  </p>
                  <p>
                    Feels like: <strong>{Math.floor(((climate.main && climate.main.feels_like) - 273.15) * 100) / 100}°C</strong>
                  </p>
                  <p>
                    Max: <strong>{Math.floor(((climate.main && climate.main.temp_max) - 273.15) * 100) / 100}°C</strong>, Min:{' '}
                    <strong>{Math.floor(((climate.main && climate.main.temp_min) - 273.15) * 100) / 100}°C</strong>
                  </p>
                  <div className="d-flex flex-row align-items-center">
                    <p className="mb-0 me-4">{climate.weather && climate.weather[0].description}</p>
                    <i className="fas fa-cloud fa-3x" style={{ color: '#eee' }}></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default App;

import { useState, useEffect } from 'react';

const WeatherComponent = () => {
  const [weather, setWeather] = useState<{
    location: string;
    temp: number;
  } | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const apiKey = import.meta.env.VITE_OPEN_WEATHER_MAP;

  const paragraphStyle = 'font-semibold text-sm md:text-md';

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(async (pos) => {
      try {
        setIsLoading(true);
        const { latitude, longitude } = pos.coords;
        const responseData = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`
        );
        const data = await responseData.json();
        const temp = Math.round(data.main.temp);
        const location = data.name;
        setWeather({ location, temp });
      } catch (e) {
        console.log(e);
      } finally {
        setIsLoading(false);
      }
    });
  }, [apiKey]);

  if (isLoading) {
    return <p className={paragraphStyle}>Loading weather...</p>;
  }

  if (!isLoading && !weather) {
    return <p className={paragraphStyle}>Error loading weather</p>;
  }

  return (
    <section>
      <h3 className="font-bold text-sm md:text-md lg:text-lg">{`Weather in ${weather?.location} `}</h3>
      <p className={paragraphStyle}>{`${weather?.temp}`}ºC</p>
    </section>
  );
};

export default WeatherComponent;

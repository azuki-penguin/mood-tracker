import { OPEN_WEATHER_API_KEY } from "$env/static/private";
import type { Coordinates } from "$lib/models/Coordinates";
import type { Weather } from "$lib/models/Weather";

export class WeatherApiError extends Error {
    readonly response: { status: number, body: unknown };
    constructor(message: string, response:  { status: number, body: unknown }) {
        super(message);
        this.response = response;
    }
}

type OpenWeatherResponseBody = {
    coord: {
        lon: number;
        lat: number;
    };
    weather: {
        id: number;
        main: string;
        description: string;
        icon: string;
    }[];
    main: {
        temp: number;
        temp_min: number;
        temp_max: number;
        pressure: number;
        humidity: number;
    };
    clouds: {
        all: number;
    };
    dt: number;
};

export const getCurrentWeather = async (coord: Coordinates) => {
    const params = new URLSearchParams({
        lon: `${coord.longitude}`,
        lat: `${coord.latitude}`,
        appid: OPEN_WEATHER_API_KEY,
        units: 'metric',
    });
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?${params}`);
    const json = await response.json();
    
    if (!response.ok) {
        throw new WeatherApiError('Failed to fetch weather information.', { status: response.status, body: json });
    }

    const weatherApiResponse = json as OpenWeatherResponseBody
    const iconCode = weatherApiResponse.weather[0].icon;
    const weather: Weather = {
        id: weatherApiResponse.weather[0].id,
        weather: weatherApiResponse.weather[0].main,
        description: weatherApiResponse.weather[0].description,
        iconUrl: iconCode ? `https://openweathermap.org/img/wn/${iconCode}.png` : undefined,
        temperature: weatherApiResponse.main.temp,
        pressure: weatherApiResponse.main.pressure,
        humidity: weatherApiResponse.main.humidity,
        clouds: weatherApiResponse.clouds.all,
        location: {
            coord: {
                longitude: weatherApiResponse.coord.lon,
                latitude: weatherApiResponse.coord.lat,
            }
        },
    };
    return weather;
};
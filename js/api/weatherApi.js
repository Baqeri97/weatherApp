
export async function fetchWeather(city, key) {
    const url = `https://api.weatherapi.com/v1/forecast.json?key=${key}&q=${city}&days=6`;
    const resp = await fetch(url);
    if (!resp.ok) {
    const errorData = await resp.json().catch(() => ({}));
    const message = errorData?.error?.message || `${resp.status}`;
    throw new Error(message);
    }
    const data = await resp.json();
    return data;
}


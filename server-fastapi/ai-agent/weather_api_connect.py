import openmeteo_requests

import pandas as pd
import requests_cache
from retry_requests import retry
from typing import List, Dict, Any

def get_weather_data() -> pd.DataFrame:
    # Setup the Open-Meteo API client with cache and retry on error
    cache_session = requests_cache.CachedSession('.cache', expire_after = 3600)
    retry_session = retry(cache_session, retries = 5, backoff_factor = 0.2)
    openmeteo = openmeteo_requests.Client(session = retry_session)

    # Make sure all required weather variables are listed here
    # The order of variables in hourly or daily is important to assign them correctly below
    url = "https://api.open-meteo.com/v1/forecast"
    params = {
        "latitude": -31.4065,
        "longitude": -64.1885,
        "hourly": ["temperature_2m", "precipitation_probability"],
        "timezone": "America/Sao_Paulo",
    }
    responses = openmeteo.weather_api(url, params = params)

    # Process first location. Add a for-loop for multiple locations or weather models
    response = responses[0]
    # print(f"Coordinates: {response.Latitude()}°N {response.Longitude()}°E")
    # print(f"Elevation: {response.Elevation()} m asl")
    # print(f"Timezone: {response.Timezone()}{response.TimezoneAbbreviation()}")
    # print(f"Timezone difference to GMT+0: {response.UtcOffsetSeconds()}s")

    # Process hourly data. The order of variables needs to be the same as requested.
    hourly = response.Hourly()
    hourly_temperature_2m = hourly.Variables(0).ValuesAsNumpy()
    hourly_precipitation_probability = hourly.Variables(1).ValuesAsNumpy()

    hourly_data = {"date": pd.date_range(
        start = pd.to_datetime(hourly.Time() + response.UtcOffsetSeconds(), unit = "s", utc = True),
        end =  pd.to_datetime(hourly.TimeEnd() + response.UtcOffsetSeconds(), unit = "s", utc = True),
        freq = pd.Timedelta(seconds = hourly.Interval()),
        inclusive = "left"
    )}

    hourly_data["temperature_2m"] = hourly_temperature_2m
    hourly_data["precipitation_probability"] = hourly_precipitation_probability

    hourly_dataframe = pd.DataFrame(data = hourly_data)
    # print("\nHourly data\n", hourly_dataframe)

    return hourly_dataframe


def get_weather_for_timestamps(timestamps: List[str]):
    # We need to parse the hourly_dataframe to get the weather for the given timestamps
    hourly_dataframe = get_weather_data()
    weather_data = []
    for timestamp in timestamps:
        weather = hourly_dataframe[hourly_dataframe['date'] == timestamp]
        if not weather.empty:
            weather_data.append({
                "timestamp": timestamp,
                "temperature_2m": weather["temperature_2m"].values[0],
                "precipitation_probability": weather["precipitation_probability"].values[0]
            })
    return weather_data


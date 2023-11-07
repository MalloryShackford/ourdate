import requests

def get_grid_from_coordinates(latitude, longitude):
    """
    Get grid ID, X, and Y based on latitude and longitude.

    Parameters:
    - latitude (float): Latitude of the location.
    - longitude (float): Longitude of the location.

    Returns:
    - tuple: grid ID, grid X, and grid Y.
    """
    base_url = f"https://api.weather.gov/points/{latitude},{longitude}"
    
    headers = {
        "User-Agent": "weather_checker/1.0 (gurfox.ai)"  # Replace with your own user agent info
    }

    response = requests.get(base_url, headers=headers)
    data = response.json()

    grid_id = data['properties']['gridId']
    grid_x = data['properties']['gridX']
    grid_y = data['properties']['gridY']

    return grid_id, grid_x, grid_y

def get_weather_alerts(latitude, longitude, timestamp):
    """
    Get weather alerts from api.weather.gov based on latitude, longitude, and timestamp.

    Parameters:
    - latitude (float): Latitude of the location.
    - longitude (float): Longitude of the location.
    - timestamp (str): Time in ISO format, e.g., '2023-10-16T15:00:00Z'.

    Returns:
    - list: List of alerts if available, empty list otherwise.
    """

    grid_id, grid_x, grid_y = get_grid_from_coordinates(latitude, longitude)
    
    base_url = f"https://api.weather.gov/gridpoints/{grid_id}/{grid_x},{grid_y}/alerts"
    params = {
        "activeAt": timestamp
    }

    headers = {
        "User-Agent": "weather_checker/1.0 (gurfox.ai)",  # Replace with your own user agent info
        "Accept": "application/geo+json"
    }

    response = requests.get(base_url, headers=headers, params=params)
    data = response.json()
    print(data)

    alerts = data.get('features', [])

    return alerts

# Example usage:
latitude = 40.730610
longitude = -73.935242
timestamp = '2023-10-16T15:00:00Z'
alerts = get_weather_alerts(latitude, longitude, timestamp)
print(alerts)


# Mood Tracker

Mood Tracker is a tiny app to record your mood.  
You can track your mood by mood chart.

## Installation

1. Clone this repository and install npm packages.

```bash
git clone https://github.com/azuki-penguin/mood-tracker
cd mood-tracker
yarn
```

2. Set environment variables.

```bash
cp .env.example .env
vim .env
```

3. Build the Docker container of MongoDB.

```bash
docker compose build
# To invoke Docker container
docker compose up -d
```

### About Environment Variables

This app use some external services.

- [Auth0](https://auth0.com/)
    - To use passwordless authentication
- [OpenWeatehrMap](https://openweathermap.org/)
    - To fetch current weather of the user location

| Variable Name | Description |
| -- | -- |
| `AUTH0_DOMAIN` | Your Auth0 application domain |
| `AUTH0_CLIENT_ID` | Your Auth0 application client ID |
| `AUTH0_CLIENT_SECRET` | Your Auth0 application client secret |
| `OPEN_WEATHER_API_KEY` | API key of your OpenWeather API |

## Developing The App

Run the following command to invoke development server.

```bash
docker compose up -d
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version of your app, run the following command.

```bash
npm run build
```

You can preview the production build with `npm run preview`.

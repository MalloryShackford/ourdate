# OurDate GuruFox Frontend

## setup

### Gitpod.io (the prefered way)

* Create a free account on gitpod.io
* Download the chrome extension for gitpod.io
* click on the gitpod button in the repostiory
* Set the env variabls by opening a new ternminal and running the following commands:
  
```lang:sh
gp env VITE_REACT_APP_API_HOST=https://cdn.growthbook.io
gp env VITE_REACT_APP_CLIENT_KEY=sdk-cEilaUmgxrWoHZH2
gp env VITE_REACT_APP_ENABLE_DEVMOD=0
```

### for local development ( may prove difficult to set up )

copy `env.txt` to `.env`
modify the .env file as instructed and needed.
On Linux or Macs source the `.env` file before starting the dev server.



## technology info

|Technologies| Documentation |
|-----|-----|
|ReactJS/Vite|https://vitejs.dev/guide/|
|React-Router-Dom v6.4|https://reactrouter.com/en/main/start/overview|
|Vite Plugin Radar|https://github.com/stafyniaksacha/vite-plugin-radar#options|
|Helmet|https://www.npmjs.com/package/helmet|
|Axios|https://axios-http.com/docs/intro|
|react-places-autocomplete|https://www.npmjs.com/package/react-places-autocomplete|
|react-google-maps-api|https://www.npmjs.com/package/@react-google-maps/api|
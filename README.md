# Pokéapi

The project consists on a **backend** executed in **Node.js** and a **frontend** created with **Vue 3**.

## Backend

- Developed using **Node.js**
- The chosen approach involves creating a **static data layer** using **JSON** to mitigate frequent API calls. This decision was made considering the stability of the first-generation Pokémon data.
- It makes three calls to different **pokeapi** endpoints to collect and transform the data we need on the front end.
- However, the package.json file contains a **script** to update the data from the API. Alternatively, implementing a cron task could automate this update process at regular intervals.

To generate the JSON, run the following command in your terminal. The generated file will be stored directly in the data folder of the client.


```sh
npm run start
```

## Frontend

- Uses **Vue 3** with the **setup** modern syntax.
- **TypeScript** is adopted to enhance data consistency, reliability and to prevent typing errors.
- **Vuetify** library was used to develop the filter with dropdown and autocomplete features.
- As for styling, I chose to use **SASS** alongside with a **BEM** methodology.
- **Eslint** and **Prettier** are configured to enforce coding standards and minimize errors.

## Future improvements

With more time, I'd like to add the following improvements:
- Unit testing with Vitest.
- End to end testing with Playwright.
- Node.js backend with TypeScript.
- Better error handling.
- Better filtering user experience.
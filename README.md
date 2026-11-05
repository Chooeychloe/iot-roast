# IoT Roast Review

A browser-based Internet of Things quiz built with React and Vite, covering Web and Cloud of Things, data visualization, security, ethics and privacy, and IoT system design. It is a static web app: no database or backend is required.

## Run locally

```sh
npm install
npm run dev
```

## Build and deploy

```sh
npm run build
```

The production site is written to `dist/`. On a static host, set the build command to `npm run build` and the publish/output directory to `dist`. You can also upload the contents of `dist/` to a static file host. Vite is configured to use relative asset paths, so the app can be served from a project subpath as well as a root domain.

## Browser notes

- Questions, custom questions, and settings are stored in that browser's local storage. They do not sync between browsers or devices.
- Roasts display as text only. Each round calculates the exact percentage from correct answers divided by questions in the round, and shows results by IoT module.
- The display font is loaded from Google Fonts; system fonts are used if that request is unavailable.

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and
some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md)
  uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc)
  uses [SWC](https://swc.rs/) for Fast Refresh

## Starting the application

To start the local application run `npm -i` to install the dependencies and then
`npm run dev` in the src folder. The app will start on port 5173. Tests can be
run with `npm run test` command.

**You will need to create `.env` file and configure the BE application base
path. If you are using base configuration for BE application then set
VITE_BE_APPLICATION_URL to http://localhost:8080/api**

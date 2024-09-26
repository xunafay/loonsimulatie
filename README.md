# Loonsimulatie

This is a project made for the selection procedure of the Flemish Government.
The project is build using the Angular framework version 18.

## Project structure

- PayBreakdownComponent: This component is used to display the pay breakdown of the user. It will show the user the amount of taxes and social security that is being deducted from their salary. It takes a pay scale and step as input.

- FooterComponent: This component contains the language switch that will redirect the user to the correct locale.

- AppComponent: The main component of the application. It contains the pay scale selector and the pay breakdown component.

## 'Backend'

The PayScaleService is used to fetch the pay scales from the csv. The csv is stored in the assets folder. The service will parse the csv and provide the data to the application.

## Development server

Run `npm run start`

## Testing Server Side Rendering

Run `npm run serve:ssr:loonsimulatie`

## Build

Run `npm run build` to build the project. The build artifacts will be stored in the `dist/` directory.

## SSR & Localization setup

This project is setup with SSR and localization. To get this working server side there were a few manual changes needed. I went with SSR because people on slow connections will benefit from the faster initial load time. Due to the size of this project, the difference in load time is minimal.

### Build process

Angular builds a server side version for each locale. This means that their are 4 (nl, en, fr, de) express servers build. I've built a small proxy express server that will redirect the request to the correct server side build. You can find this server in the `proxy-server.mjs` file in the root of this repository. This file gets copied over to the dist folder when building the project, using `copy-proxy-server.js`. A javascript file is used so that it can be run on any OS.

The different locales are exposed on different base paths. Defined in `angular.json`.

- `/` - Dutch
- `/en` - English
- `/fr` - French
- `/de` - German

In the footer of the application you can find a language switcher that will redirect you to the correct locale.

## CI/CD

This project has a CI/CD pipeline setup using GitHub Actions. The pipeline is defined in the `.github/workflows` folder. It will run the tests and build the project. The docker container is build and pushed to the GitHub Container Registry. The image is tagged with the commit hash and the branch name. This is then deployed to the Kubernetes cluster.

The cluster is a small one node cluster I use to host my personal projects. The Kubernetes configuration is stored in the `.github/deployment.yaml` file. It's a simple deployment with a service and a HAProxy ingress. The end result is that the application is available on `https://loonsimulatie.hexodine.com`.

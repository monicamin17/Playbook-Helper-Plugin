# Playbook Helper Plugin Guide

This template contains the react example as shown on [Figma Docs](https://www.figma.com/plugin-docs/intro/), with some structural changes and extra tooling.

⭐ To change the UI of your plugin (the react code), start editing [App.tsx](./src/app/components/App.tsx).  
⭐ To interact with the Figma API edit [controller.ts](./src/plugin/controller.ts).  
⭐ Read more on the [Figma API Overview](https://www.figma.com/plugin-docs/api/api-overview/).


## Start
- Run `npm i` or `npm install` to install dependencies
- Run `npm run build` to start webpack in watch mode.
- Open `Figma` -> `Plugins` -> `Development` -> `Import plugin from manifest...` and choose `manifest.json` file from this repo.

## Limitations
### General
- The plugin is currently not enabled to store any personal user data, like their Figma access token, files, etc. This requires authentication and would allow you to get user-specific data, provide linter suggestions, etc.. To enable authentication, uncomment the `saveToken` and `getToken` cases in `controller.ts`. You will also need to uncomment certain lines in `App.tsx` (l. 3, 13, 29, 56-58, 84-87, 162-163).


### Linter
- 

### Content Reel


### Styles

## Toolings

This repo is using:

- React + Webpack
- TypeScript
- Prettier precommit hook

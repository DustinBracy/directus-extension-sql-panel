# Directus SQL Panel and Endpoint
This repository contains a simple extension for Directus, a headless CMS and API toolkit. The extension adds a panel and endpoint component which shows result of an SQL query as sortable v-table.

This repo is basically a fork of harish2704 project with changes to work on MSSQL and some changes on the v-table.

## Instructions
The extension is already build and the components can be found in the **build** directory

1. Copy the directory **s-endpoint-sql** from build to 
**[directus directory]/extensions/endpoints/**

1. Copy the directory **s-panel-sql** from build to
**[directus directory]/extensions/panels/**

1. Restart your directus app

or 

1. Build each extension via `npm run build` or  `npm directus-extension build`

1. Copy from the first extension `dist/index.js` to `/directus/extensions/endpoints/sql-panel-s-endpoint/` (or whereever your extension folder is)

1. Copy from the second extension `dist/index.js` to `/directus/extensions/panels/sql-panel-s/` (or whereever your extension folder is)


## Configuration
The extension doesn't need configuration but if you will use it on another DB change the below in the endpoint component 
```JS
const panelQueryResult = await database.raw(`SELECT [options] FROM [directus_panels] WHERE [id] = '${[panelId]}'`);
```
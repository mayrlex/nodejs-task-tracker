#!/usr/bin/env node

import App from "./src/app.js";

const args = process.argv.slice(2);
const app = new App(args);

app.init();
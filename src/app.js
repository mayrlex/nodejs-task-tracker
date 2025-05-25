#!/usr/bin/env node

import { TaskManager } from "./modules/taskManager.js";
import { DisplayManager } from "./modules/displayManager.js";
import { StoreManager } from "./modules/storeManager.js";
import { ERR, STORE_PATH, HP } from "./constants.js";

class App {
    constructor(args) {
        this.args = args;
        this.cmd = this.args[0];

        this.sm = new StoreManager(STORE_PATH);
        this.sm.init();

        this.tm = new TaskManager(this.sm);
        this.dm = new DisplayManager(this.sm.store);

        this.cmds = {
            a: "add",
            u: "update",
            mp: "mark-in-progress",
            md: "mark-done",
            d: "delete",
            l: "list"
        };

    }

    help() {
        return `
            \x1b[37m\x1b[44m add \x1b[0m — Add a new task
            \targs: \x1b[32m<Description>\x1b[0m

            \x1b[37m\x1b[44m update \x1b[0m — Update task description
            \targs: \x1b[32m<ID> <Description>\x1b[0m
            
            \x1b[37m\x1b[44m mark-in-progress \x1b[0m — Mark task as "in-progress"
            \targs: \x1b[32m<ID>\x1b[0m
            
            \x1b[37m\x1b[44m mark-done \x1b[0m — Mark task as "done"
            \targs: \x1b[32m<ID>\x1b[0m
            
            \x1b[37m\x1b[41m delete \x1b[0m — Delete task
            \targs: \x1b[32m<ID>\x1b[0m

            \x1b[37m\x1b[44m list \x1b[0m — Shows all tasks

            \x1b[37m\x1b[44m list todo \x1b[0m — Shows all tasks in "todo" status

            \x1b[37m\x1b[44m list todo \x1b[0m — Shows all tasks in "in-progress" status

            \x1b[37m\x1b[44m list todo \x1b[0m — Shows all tasks in "done" status
        `
    }

    init() {
        if (!this.args.length) {
            console.error(`${HP}\n${this.help().replace(/^[ ]+/gm, '')}`);

            return;
        }

        if (this.cmd === this.cmds.a) {
            if (this.args.length > 2) {
                console.error(`${ERR} To many arguments!`);
                return;
            }

            if (!this.args[1]) {
                console.error(`${ERR} Task description not specified!`);
                return;
            }

            this.tm.add(this.args[1]);

            return;
        }

        if (this.cmd === this.cmds.u) {
            if (this.args.length > 3) {
                console.error(`${ERR} To many arguments!`);
                return;
            }

            if (!this.args[1]) {
                console.error(`${ERR} Task ID not specified!`);
                return;
            }

            if (isNaN(Number(this.args[1]))) {
                console.error(`${ERR} Task ID must be numeric type!`);
                return;
            }

            if (!this.args[2]) {
                console.error(`${ERR} Specify a new task description!`);
                return;
            }

            this.tm.updateDesc({
                id: Number(this.args[1]),
                desc: this.args[2],
            });

            return;
        }

        if (this.cmd === this.cmds.mp) {
            if (this.args.length > 2) {
                console.error(`${ERR} To many arguments!`);
                return;
            }

            if (!this.args[1]) {
                console.error(`${ERR} Task ID not specified!`);
                return;
            }

            if (isNaN(Number(this.args[1]))) {
                console.error(`${ERR} Task ID must be numeric type!`);
                return;
            }

            this.tm.updateStatus({
                id: Number(this.args[1]),
                status: "in-progress",
            });

            return;
        }

        if (this.cmd === this.cmds.md) {
            if (this.args.length > 2) {
                console.error(`${ERR} To many arguments!`);
                return;
            }

            if (!this.args[1]) {
                console.error(`${ERR} Task ID not specified!`);
                return;
            }

            if (isNaN(Number(this.args[1]))) {
                console.error(`${ERR} Task ID must be numeric type!`);
                return;
            }

            this.tm.updateStatus({
                id: Number(this.args[1]),
                status: "done",
            });

            return;
        }

        if (this.cmd === this.cmds.d) {
            if (this.args.length > 2) {
                console.error(`${ERR} To many arguments!`);
                return;
            }

            if (!this.args[1]) {
                console.error(`${ERR} Task ID not specified!`);
                return;
            }

            if (isNaN(Number(this.args[1]))) {
                console.error(`${ERR} Task ID must be numeric type!`);
                return;
            }

            this.tm.delete(Number(this.args[1]));

            return;
        }

        if (this.cmd === this.cmds.l) {
            let status = null;

            if (this.args[1] === "todo") status = "todo";
            if (this.args[1] === "in-progress") status = "in-progress";
            if (this.args[1] === "done") status = "done";

            this.dm.show(status);

            return;
        }

        console.error(`${ERR} Command "${this.args[0]}" not found!`);
    }
}





export default App;
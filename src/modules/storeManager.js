import * as fs from "fs";

const INITIAL_STORE = {
    currentId: 0,
    length: 0,
    tasks: [],
}

export class StoreManager {
    constructor(storePath) {
        this.storePath = storePath;
    }
    get #isStoreExists() {
        return fs.existsSync(this.storePath);
    }

    init() {
        if (!this.#isStoreExists) {
            this.store = INITIAL_STORE;
        }
    }

    get store() {
        return JSON.parse(fs.readFileSync(this.storePath, { encoding: "utf8" }));
    }

    set store(value) {
        fs.writeFileSync(this.storePath, JSON.stringify(value, null, 4), { encoding: "utf8" });
    }
}
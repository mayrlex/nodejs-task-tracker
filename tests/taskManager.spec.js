import { expect, jest, test } from "@jest/globals";
import { ERR, STORE_PATH, TT } from "../src/constants.js";

let mockStore = {
    currentId: 0,
    length: 0,
    tasks: [],
};

jest.unstable_mockModule("fs", () => ({
    readFileSync: jest.fn(() => JSON.stringify(mockStore)),
    writeFileSync: jest.fn((path, data) => {
        mockStore = JSON.parse(data);
    }),
    existsSync: jest.fn(() => true),
}));

const { StoreManager } = await import('../src/modules/storeManager.js');
const { TaskManager } = await import('../src/modules/taskManager.js');

describe("TaskManager", () => {
    let tm;

    beforeEach(() => {
        mockStore = {
            currentId: 0,
            length: 0,
            tasks: [],
        };

        const sm = new StoreManager(STORE_PATH);

        sm.init();

        tm = new TaskManager(sm);
    });

    test("Adds new task", () => {
        tm.add("Open sauce tomorrow");

        expect(mockStore.length).toBe(1);
        expect(mockStore.tasks[0].desc).toBe("Open sauce tomorrow");
        expect(mockStore.tasks[0].status).toBe("todo");
    });


    test("Updates task description", () => {
        tm.add("Open sauce tomorrow");
        tm.updateDesc({
            id: 1,
            desc: "Open sauce today"
        });

        expect(mockStore.tasks[0].desc).toBe("Open sauce today");
    });

    test("Updates task status", () => {
        tm.add("Open sauce tomorrow");
        tm.add("Complete daily");
        tm.add("Talk to the cat");

        tm.updateStatus({
            id: 2,
            status: "in-progress"
        });

        expect(mockStore.tasks[1].status).toBe("in-progress");
    });

    test("Sets the same status", () => {
        const consoleLogSpy = jest.spyOn(console, "log").mockImplementation(() => { });

        tm.add("Open sauce tomorrow");
        tm.add("Complete daily");
        tm.add("Talk to the cat");

        tm.updateStatus({
            id: 2,
            status: "in-progress"
        });

        tm.updateStatus({
            id: 2,
            status: "in-progress"
        });

        expect(consoleLogSpy).toHaveBeenCalledWith(`${TT} this status already set. Nothing has changed`);

        consoleLogSpy.mockRestore();
    });

    test("Deletes task", () => {
        tm.add("Open sauce tomorrow");
        tm.add("Complete daily");
        tm.add("Talk to the cat");

        tm.delete(2);

        expect(mockStore.tasks.some(task => task.id === 2)).toBe(false);
    });

    test("Deletes a non-existent task", () => {
        const initLength = mockStore.length;
        const consoleErrorSpy = jest.spyOn(console, "error").mockImplementation(() => { });

        tm.delete(999);

        expect(mockStore.tasks.length).toBe(initLength);
        expect(consoleErrorSpy).toHaveBeenCalledWith(`${ERR} Task with id "999" doesn't exists!`);

        consoleErrorSpy.mockRestore();
    });

    test("Updates a non-existent task description", () => {
        const consoleErrorSpy = jest.spyOn(console, "error").mockImplementation(() => { });

        tm.updateDesc({
            id: 999,
            desc: "A new task description"
        });

        expect(consoleErrorSpy).toHaveBeenCalledWith(`${ERR} Task with id "999" doesn't exists!`);

        consoleErrorSpy.mockRestore();
    });

    test("Updates a non-existent task status", () => {
        const consoleErrorSpy = jest.spyOn(console, "error").mockImplementation(() => { });

        tm.updateStatus({
            id: 999,
            status: "in-progress"
        });

        expect(consoleErrorSpy).toHaveBeenCalledWith(`${ERR} Task with id "999" doesn't exists!`);

        consoleErrorSpy.mockRestore();
    });
});
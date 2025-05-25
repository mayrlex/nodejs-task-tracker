import { ERR, TT } from "../constants.js";
import { createTask } from "./createTask.js";

/**
 * The task manager
 * @param {class} StoreManager the StoreManager instance
 * @method add adds a new task
 * @method updateDesc updates task description
 * @method updateStatus updates task status
 * @method delete removes task
*/
export class TaskManager {
    constructor(storeManager) {
        this.sm = storeManager;
        this.store = this.sm.store;
    }

    #isTaskExists(id) {
        return this.store.tasks.some(task => task.id === id);
    }

    /**
     * Adds a new task with specific description
     * 
     * @param {string} desc task description
    */
    add(desc) {
        this.store.currentId++;
        this.store.length++;

        const task = createTask({ id: this.store.currentId, desc: desc });

        this.store.tasks.push(task);
        this.sm.store = this.store;

        console.log(`${TT} \x1b[32msuccessfully added!\x1b[0m`);
    }

    /**
     * Updates the specific prop in a task
     * 
     * @param {number} id task id
     * @param {string} prop specific prop
     * @augments prop desc, status
    */
    #update(id, prop, value) {
        if (!this.#isTaskExists(id)) {
            console.error(`${ERR} Task with id "${id}" doesn't exists!`);
            return;
        }

        this.store.tasks.forEach(task => {
            if (task.id === id) {
                if (prop === "status" && task.status === value) {
                    console.log(`${TT} this status already set. Nothing has changed`);

                    return;
                }

                task[prop] = value;
                task.updatedAt = Date.now();

                console.log(`${TT} \x1b[32mstatus successfully marked as "${value}"!\x1b[0m`);
            };
        });

        this.sm.store = this.store;
    }

    /**
     * Updates task description
     * 
     * @param {object} props the props
     * @param {number} props.id task id
     * @param {string} props.desc task description
    */
    updateDesc(props) {
        this.#update(props.id, "desc", props.desc);

        console.log(`${TT} \x1b[32msuccessfully updated!\x1b[0m`);
    }

    /**
     * Updates task status
     * 
     * @param {object} props the props
     * @param {number} props.id task id
     * @param {string} props.status task status
     * @argument props.status todo, in-progress done
    */
    updateStatus(props) {
        this.#update(props.id, "status", props.status);
    }


    /**
     * Removes task
     * @param {number} id task id
    */
    delete(id) {
        if (!this.#isTaskExists(id)) {
            console.error(`${ERR} Task with id "${id}" doesn't exists!`);
            return;
        }

        this.store.tasks = this.store.tasks.filter(task => task.id !== id);
        this.store.length--;
        this.sm.store = this.store;

        console.log(`${TT} \x1b[31msuccessfully deleted!\x1b[0m`);
    }
}
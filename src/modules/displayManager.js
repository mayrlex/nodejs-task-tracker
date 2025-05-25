/**
 * The display manager
 * @param {class} StoreManager the StoreManager instance
 * @method show outputs to the terminal a list of all tasks or tasks with a specific status
*/
export class DisplayManager {
    constructor(store) {
        this.store = store;
    }

    /**
     * Outputs to the terminal a list of all tasks or tasks with a specific status
     * @param {string|null} status todo | in-progress | done
    */
    show(status) {
        for (let index = 0; index < this.store.length; index++) {
            const task = { ...this.store.tasks[index] };
            const formattedString = `
                Task: ${task.desc}
                ID: ${task.id}
                ${!status ? `Status: ${task.status}` : ""}
                Created: ${new Date(task.createdAt).toLocaleString()}
                ${task.updatedAt ? `Updated: ${new Date(task.updatedAt).toLocaleString()}` : ""}
                ------------------------------
            `;

            if (!status || task.status === status) {
                console.log(formattedString.replace(/^\s+/gm, ''));
            }

        }
    }
}
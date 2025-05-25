export const createTask = ({ id, desc }) => {
    return {
        id: id,
        desc: desc,
        status: "todo",
        createdAt: Date.now(),
        updatedAt: null,
    };
};
# Task Tracker

Simple CLI task tracker for task management

## 📦 Install

Required: NodeJS 14 and above

### Clone

```bash
git clone https://github.com/mayrlex/nodejs-task-tracker

cd nodejs-task-tracker

npm i
```

### 🔗 Linking CLI command

```bash
npm link
```

### 🚀 Run

```bash
task-cli [command] [arguments...]
```

| Command            | Arguments                 | Description                   |
| ------------------ | ------------------------- | ----------------------------- |
| `add`              | `<description>`           | Add a new task                |
| `update`           | `<id>` `<description>`    | Update task description by ID |
| `mark-in-progress` | `<id>`                    | Mark task as "in-progress"    |
| `mark-done`        | `<id>`                    | Mark task as "done"           |
| `delete`           | `<id>`                    | Delete task                   |
| `list`             |                           | Shows all tasks               |
| `list`             | `[todo/in-progress/done]` | Shows tasks by status         |

---

## 🧪 Test

Run Jest

```bash
npm run test
```

Run Jest with lcov report

```bash
npm run test:lcov
```
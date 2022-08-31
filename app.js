const bodyParser = require("body-parser");
const express = require("express");
const app = express();

const path = require("path");
app.set("view engine", "pug");

// app.set("views", path.resolve("./src/views"))
const userRouter = require('./src/routers/user')
const taskRouter = require('./src/routers/task')
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(userRouter)
app.use(taskRouter)

const rootPath = path.resolve("./dist");
app.use(express.static(rootPath));

// // db connection
require("./src/Database/connection");
const port = process.env.PORT


app.listen(port, () => {
    console.log(`Server is up on port  ${port}`)
})


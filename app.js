const bodyParser = require("body-parser");
const express = require("express");
const app = express();

const path = require("path");
app.set("view engine", "pug");


const userRouter = require('./src/routers/user')
const taskRouter = require('./src/routers/task')
const errorHandler = require('./src/middleware/errorHandler')
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(userRouter)
app.use(taskRouter)

const rootPath = path.resolve("./dist");
app.use(express.static(rootPath));


require("./src/Database/connection");
const port = process.env.PORT || 3000

app.use(errorHandler)


app.listen(port, () => {
    console.log(`Server is up on port  ${port}`)
})


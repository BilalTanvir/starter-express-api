const express = require('express');
const app = express();
const mongoose = require("mongoose");
const userRouter = require('./routes/userRoutes');
const noteRouter = require('./routes/noteRoutes');
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();    


const PORT = process.env.PORT || 2000;

app.use(express.json());
app.use(cors());
app.use("/users", userRouter);
app.use("/notes",noteRouter);


app.get("/", (req, res) => {
    res.send("HGLLO");
});
mongoose.connect(process.env.MONGO_DB).then(() => {

    app.listen(PORT, () => {
        console.log("Server Started port no. " + PORT);
    });;
}).catch((error) => {
    console.log(error)
});
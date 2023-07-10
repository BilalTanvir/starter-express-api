const express = require('express');
const app = express();
const mongoose = require("mongoose");
const userRouter = require('./routes/userRoutes');
const noteRouter = require('./routes/noteRoutes');
const uri = "mongodb+srv://admin:admin+router@cluster0.0lbusbp.mongodb.net/notes_db?retryWrites=true&w=majority";
// const cors = require("cors");
// env.config();

const PORT = process.env.PORT || 2000;

app.use(express.json());
app.use("/users", userRouter);
app.use("/notes",noteRouter);


// app.use(cors());

app.get("/", (req, res) => {
    res.send("HGLLO");
});
mongoose.connect(uri).then(() => {

    app.listen(PORT, () => {
        console.log("Server Started port no. " + PORT);
    });;
}).catch((error) => {
    console.log(error)
});
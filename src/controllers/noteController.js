const noteModel = require("../models/note");

const createNote = async (req, res) => {
    const { reqTitle, reqDescription } = req.body;
    console.log(req.userId);

    const newNote = new noteModel({
        title: reqTitle,
        description: reqDescription,
        userId: req.userId
    });

    try {
        await newNote.save();
        res.status(200).json(newNote);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong" });
    }
}

const updateNote = (req, res) => {
    console.log(req.userId)
    res.send(req.userId);
}

const deleteNote = (req, res) => {
    console.log(req.userId)
    res.send(req.userId);
}

const getNote = async (req, res) => {
    try {
        const notes = await noteModel.find({userId: req.userId});
        res.status(200).json(notes);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong" });
    }
}

module.exports = { createNote, updateNote, deleteNote, getNote }
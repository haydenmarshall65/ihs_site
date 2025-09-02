import Express from "express";
import { Storage } from "../utils/storage.js";

const researchPaperRouter = Express.Router()

researchPaperRouter.get('/:fileName', (req, res) => {
    if ('fileName' in req.params) {
        const storage = Storage.getStorageInstance()
        const fileName = req.params.fileName

        if (typeof fileName !== 'string') {
            res.status(500).send("Incorrect type for 'file_name'. Please send a string of a file name.")
            return;
        }

        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', `attachment; filename="${fileName}"`)

        const contents = storage.get(fileName);

        if (contents !== undefined) {
            res.send(contents);
        } else {
            res.status(400).send("Could not find a file with name " + fileName + ". Try a new name or check for spelling errors.")
        }
    } else {
        res.status(500).send("Please send a fileName")
    }
})

export default researchPaperRouter;
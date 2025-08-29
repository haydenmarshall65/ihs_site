import Express, { type Request, type Response } from "express";

const router = Express.Router()

router.get('/', (req: Request, res: Response) => {
    res.status(200).send("Ok");
})

export default router
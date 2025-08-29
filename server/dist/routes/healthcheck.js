import Express, {} from "express";
const router = Express.Router();
router.get('/', (req, res) => {
    res.status(200).send("Ok");
});
export default router;
//# sourceMappingURL=healthcheck.js.map
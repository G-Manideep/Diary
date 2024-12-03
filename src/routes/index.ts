import express, { NextFunction, Request, Response } from "express";
import accountRouter from "./account";

const router = express.Router({ mergeParams: true });

router.use("/account", accountRouter);
router.get("/health-check", (req: Request, res: Response, next: NextFunction) => {
	try {
		res.status(200).json({ message: "Health Check Successful" });
	} catch (err) {
		next(err);
	}
});

export default router;
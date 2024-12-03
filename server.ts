import { Application, NextFunction, Request, Response } from "express";
import authRouter from "./src/routes";
import express from "express";
import "./types/global";

export function startServer() {
	const app = express();
	const PORT = process.env.PORT || 3200;

	app.use("/auth", authRouter);
	app.get("/health-check", (req: Request, res: Response) => {
		try {
			res.status(200).json({ message: "Health Check Successful" });
		} catch (err) {
			throw err;
		}
	});

	app.listen(PORT, () => {
		console.log(`Server is running on http://localhost:${PORT}`);
	});
}

startServer();

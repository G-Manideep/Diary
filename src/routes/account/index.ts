import express, { NextFunction, Request, Response } from "express";
import { handleAccountCreate, handleAccountDelete, handleAccountRead, handleAccountUpdate } from "../../controllers/account";
import diaryEntryRouter from "./diaryEntry";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const router = express.Router({ mergeParams: true });

router.post("create/one", async (req: Request, res: Response, next: NextFunction) => {
	try {
		const account = await handleAccountCreate(req.body);
		res.status(200).json({ data: { account }, message: "Account Created Successfully" });
	} catch (err) {
		next(err);
	}
});

router.post(":accountId/read/one", async (req: Request, res: Response, next: NextFunction) => {
	try {
		const account = req.account;
		res.status(200).json({ data: { account }, message: "Account Created Successfully" });
	} catch (err) {
		next(err);
	}
});

router.post(":accountId/update/one", async (req: Request, res: Response, next: NextFunction) => {
	try {
		const account = await handleAccountUpdate(req.body);
		res.status(200).json({ data: { account }, message: "Account Created Successfully" });
	} catch (err) {
		next(err);
	}
});

router.post(":accountId/delete/one", async (req: Request, res: Response, next: NextFunction) => {
	try {
		const account = await handleAccountDelete(req.body);
		res.status(200).json({ data: { account }, message: "Account Created Successfully" });
	} catch (err) {
		next(err);
	}
});

router.param("accountId", async (req, res, next) => {
	try {
		let account = await prisma.user.findUnique({
			where: { id: req.params.accountId },
			select: { id: true, name: true, userName: true, email: true, phoneNumber: true },
		});
		if (!account) throw("Could not find the specified Account. Check your url parameters.");
		else {
			req.account = account;
			next();
		}
	} catch (err) {
		next(err);
	}
});

router.use("/:accountId/diaryEntry", diaryEntryRouter);

export default router;

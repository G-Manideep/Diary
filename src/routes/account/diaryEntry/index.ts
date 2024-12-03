import express, { NextFunction, Request, Response } from "express";
import { handleDiaryEntryCreate, handleDiaryEntryDelete, handleDiaryEntryRead, handleDiaryEntryUpdate } from "../../../controllers/diaryEntry";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const router = express.Router({ mergeParams: true });

router.post("create/one", async (req: Request, res: Response, next: NextFunction) => {
	try {
		const diaryEntry = await handleDiaryEntryCreate(req.body);
		res.status(200).json({ data: { diaryEntry }, message: "DiaryEntry Created Successfully" });
	} catch (err) {
		next(err);
	}
});

router.post("read/one", async (req: Request, res: Response, next: NextFunction) => {
	try {
		const diaryEntry = req.diaryEntry;
		res.status(200).json({ data: { diaryEntry }, message: "DiaryEntry Created Successfully" });
	} catch (err) {
		next(err);
	}
});

router.post("update/one", async (req: Request, res: Response, next: NextFunction) => {
	try {
		const diaryEntry = await handleDiaryEntryUpdate(req.body);
		res.status(200).json({ data: { diaryEntry }, message: "DiaryEntry Created Successfully" });
	} catch (err) {
		next(err);
	}
});

router.post("delete/one", async (req: Request, res: Response, next: NextFunction) => {
	try {
		const diaryEntry = await handleDiaryEntryDelete(req.body);
		res.status(200).json({ data: { diaryEntry }, message: "DiaryEntry Created Successfully" });
	} catch (err) {
		next(err);
	}
});

router.param("diaryEntryId", async (req, res, next) => {
	try {
		let diaryEntry = await prisma.diaryEntry.findUnique({
			where: { id: req.params.diaryEntryId },
			select: { id: true, date: true, title: true, subject: true, content: true },
		});
		if (!diaryEntry) throw("Could not find the specified DiaryEntry. Check your url parameters.");
		else {
			req.diaryEntry = diaryEntry;
			next();
		}
	} catch (err) {
		next(err);
	}
});

export default router;
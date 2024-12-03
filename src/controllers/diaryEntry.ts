import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

type diaryEntryCreateInput = {
	date: string;
	title: string;
	subject: string;
	content: string;
	userId: string;
};

type diaryEntryUpdateInput = {
	id: string;
	date: string;
	title: string;
	subject: string;
	content: string;
	userId: string;
};

export async function handleDiaryEntryCreate(data: diaryEntryCreateInput) {
	try {
		const inputData = {
			date: data.date,
			title: data.title,
			subject: data.subject,
			content: data.content,
			User: {
				connect: { id: data.userId },
			},
		};
		const diaryEntry = await prisma.diaryEntry.create({ data: inputData });
		return diaryEntry;
	} catch (err) {
		throw err;
	}
}

export async function handleDiaryEntryRead(id: string) {
	try {
		const diaryEntry = await prisma.diaryEntry.findUnique({
			where: { id: id },
			select: { id: true, date: true, title: true, subject: true, content: true },
		});
		return diaryEntry;
	} catch (err) {
		throw err;
	}
}

export async function handleDiaryEntryUpdate(data: diaryEntryUpdateInput) {
	try {
		const inputData = {
			date: data.date,
			title: data.title,
			subject: data.subject,
			content: data.content
		};
		const diaryEntry = await prisma.diaryEntry.update({ where: { id: data.id }, data: inputData });
		return diaryEntry;
	} catch (err) {
		throw err;
	}
}

export async function handleDiaryEntryDelete(id: string) {
	try {
		const diaryEntry = await prisma.diaryEntry.delete({ where: { id: id } });
		return diaryEntry;
	} catch (err) {
		throw err;
	}
}

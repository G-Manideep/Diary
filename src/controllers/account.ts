import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

type accountCreateInput = {
	name: string;
	userName: string;
	email: string;
	phoneNumber: string;
	password: string;
};

type accountUpdateInput = {
	id: string;
	name: string;
	userName: string;
	email: string;
	phoneNumber: string;
	password: string;
};

export async function handleAccountCreate(data: accountCreateInput) {
	try {
		const inputData = {
			name: data.name,
			userName: data.userName,
			email: data.email,
			phoneNumber: data.phoneNumber,
			passwordHash: data.password,
		};
		const account = await prisma.user.create({ data: inputData });
		return account;
	} catch (err) {
		throw err;
	}
}

export async function handleAccountRead(id: string) {
	try {
		const account = await prisma.user.findUnique({
			where: { id: id },
			select: { id: true, name: true, userName: true, email: true, phoneNumber: true },
		});
		return account;
	} catch (err) {
		throw err;
	}
}

export async function handleAccountUpdate(data: accountUpdateInput) {
	try {
		const inputData = {
			name: data.name,
			userName: data.userName,
			email: data.email,
			phoneNumber: data.phoneNumber,
			passwordHash: data.password,
		};
		const account = await prisma.user.update({ where: { id: data.id }, data: inputData });
		return account;
	} catch (err) {
		throw err;
	}
}

export async function handleAccountDelete(id: string) {
	try {
		const account = await prisma.user.delete({ where: { id: id } });
		return account;
	} catch (err) {
		throw err;
	}
}

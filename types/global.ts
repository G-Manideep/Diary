declare global {

	namespace Express {
		interface Request {
			account: {
                id: string;
                name: string;
                userName: string;
                email: string;
                phoneNumber: string;
            } | null;
            diaryEntry: {
                id: string;
                date: Date;
                title: string;
                subject: string;
                content: string;
            } | null;
		}
	}
}

export {};
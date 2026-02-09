export interface UserSessionData {
	session: Session;
	user: User;
}

export interface Session {
	expiresAt: string;
	token: string;
	createdAt: string;
	updatedAt: string;
	ipAddress: string;
	userAgent: string;
	userId: string;
	id: string;
}

export interface User {
	name: string;
	email: string;
	emailVerified: boolean;
	image: null | string;
	createdAt: string;
	updatedAt: string;
	id: string;
}

export interface onBoardingForm {
	workspace_name: string;
	workspace_url: string;
	avatar?: string;
}

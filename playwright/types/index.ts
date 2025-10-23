export interface UserData {
    username: string;
    email: string;
    password: string;
    firstName?: string;
    lastName?: string;
    dateOfBirth?: string;
}

export interface RegistrationResult {
    success: boolean;
    message?: string;
    username?: string;
}

export interface TestConfig {
    baseURL: string;
    timeout: number;
    headless: boolean;
}
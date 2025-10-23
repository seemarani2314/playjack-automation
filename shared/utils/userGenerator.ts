import { UserData } from '../types';

export class UserGenerator {
    private static counter = 1;

    static generateUserData(prefix: string = 'user'): UserData {
        const timestamp = Date.now().toString().slice(-6);
        const counter = this.counter++;

        return {
            username: `${prefix}${timestamp}${counter}`.substring(0, 16), // Ensure max 16 chars
            email: `test${timestamp}${counter}@example.com`,
            password: 'Test123!'
        };
    }

    static generateMultipleUsers(count: number): UserData[] {
        return Array.from({ length: count }, () => this.generateUserData());
    }
}
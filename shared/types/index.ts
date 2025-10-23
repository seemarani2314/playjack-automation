export interface UserData {
    username: string;
    email: string;
    password: string;
}

export interface BonusHistory {
    dateTime: string;
    reference: string;
    description: string;
    startingBalance: string;
    amount: string;
    totalAmount: string;
    endBalance: string;
}
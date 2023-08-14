export class Customer {
    fullName: string;
    emailId: string;
    password: string;
    phoneNumber: string;

    constructor(fullName: string, emailId: string, password: string, phoneNumber: string) {
        this.fullName = fullName;
        this.emailId = emailId;
        this.password = password;
        this.phoneNumber = phoneNumber;
    }
}
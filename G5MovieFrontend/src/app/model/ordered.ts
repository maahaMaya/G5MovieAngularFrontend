export class Ordered {
    oid: Number;
    quantity: Number;
    price: Number;
    emailId: String;
    currentDate: Date;
    transactionId: Number;

    constructor(oid: Number, quantity: Number, price: Number,  emailId: String,  currentDate: Date,
        transactionId: Number) {
        this.oid = oid;
        this.quantity = quantity;
        this.price = price;
        this.emailId = emailId;
        this.currentDate = currentDate;
        this.transactionId = transactionId;
    }
}

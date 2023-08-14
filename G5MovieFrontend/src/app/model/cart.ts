import { Movie } from "./movie";

export class Cart {
    id: Number;
    quantity: Number;
    price: Number;
    movie: Movie;

    constructor(id: Number, quantity: Number, price: Number,  movie: Movie) {
        this.id = id;
        this.quantity = quantity;
        this.price = price;
        this.movie = movie;
    }
}

import { Component, OnInit } from '@angular/core';
import { Cart } from 'src/app/model/cart';
import { Movie } from 'src/app/model/movie';
import { CartService } from 'src/app/service/cart.service';
import { MovieService } from 'src/app/service/movie.service';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.scss']
})
export class MovieComponent implements OnInit {
  searchKeyword: string = '';
  movies: Movie[] = [];

  constructor(
    private movieService: MovieService,
    private cartService: CartService
  ) { }

  ngOnInit(): void {
    this.getmovie();
  }

  getmovie(): void {
    this.movieService.getFullMovieList().subscribe((data) => {
      this.movies = data;
      console.log(data)
    });
  }

  addToCart(movie: Movie) {
    if(sessionStorage.getItem('customerEmail') == null || sessionStorage.getItem('customerEmail') == ''){
      alert("Please Login...")
      return;
    }
    const cartItem = new Cart(0, 1, movie.movieTicketPrice, movie);

    this.cartService.addToCart(cartItem).subscribe((data) => {
      console.log(data);
      alert("Movie is added to cart Successfully")
    });

  }


  searchMovieByAction(searchKeyword : any) {
    this.movieService.searchMovieByAction(searchKeyword).subscribe((data) => {
      this.movies = data;
    })
  }

  SearchMovie() {
    if(this.searchKeyword === ""){
      this.getmovie();
    }
    else{
      this.movieService.searchMovie(this.searchKeyword).subscribe((data) => {
        this.movies = data;
        console.log(data)
      })
    }
  }
}


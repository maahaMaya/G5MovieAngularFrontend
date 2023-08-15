import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Movie } from 'src/app/model/movie';
import { Sort } from '@angular/material/sort';
import { MovieService } from 'src/app/service/movie.service';

@Component({
  selector: 'app-admin-movies',
  templateUrl: './admin-movies.component.html',
  styleUrls: ['./admin-movies.component.scss']
})
export class AdminMoviesComponent implements OnInit {
  public allMovies!: Movie[];
  public moviesAfterSort!: Movie[];

  formValue!: FormGroup;
  movieModelObject: Movie = new Movie(0, '', '', '', 0, 0, '', '', true);
  showAdd = false;
  showUpdate = false;
  message = '';

  constructor(
    private router: Router,
    private movieService: MovieService,
    private formBuilder: FormBuilder
  ) {
  }

  ngOnInit(): void {
    this.getMovies();

     this.formValue = this.formBuilder.group({
      movieName: [''],
      movieDescription: [''],
      movieDuration: [''],
      movieActionType: [''],
      movieTicketPrice: [''],
      movieRating: [''],
      movieAvilable: [''],
      movieImagePath: ['']
    });
  }


  getMovies() {
    this.movieService.getFullMovieList().subscribe((data) => {
      this.allMovies = data;
      console.log(data);
    });
  }


  //addmovuct buttom click
  clickAddMovie() {
    this.formValue.reset();
    this.showAdd = true;
    this.showUpdate = false;
  }

   //adding movuct
   addmovie() {
    if (
      !this.formValue.value.movieName ||
      !this.formValue.value.movieDescription ||
      !this.formValue.value.movieActionType ||
      !this.formValue.value.movieAvilable ||
      !this.formValue.value.movieImagePath ||
      !this.formValue.value.movieTicketPrice
    ) {
      this.message = 'Fields must not be empty';
      return;
    }
    this.movieModelObject.movieName = this.formValue.value.movieName;
    this.movieModelObject.movieDescription = this.formValue.value.movieDescription;
    this.movieModelObject.movieDuration = this.formValue.value.movieDuration;
    this.movieModelObject.movieActionType = this.formValue.value.movieActionType;
    this.movieModelObject.movieTicketPrice = this.formValue.value.movieTicketPrice;
    this.movieModelObject.movieRating = this.formValue.value.movieRating;
    this.movieModelObject.movieAvilable = this.formValue.value.movieAvilable;
    this.movieModelObject.movieImagePath = this.formValue.value.movieImagePath;
    this.movieService.addMovie(this.movieModelObject).subscribe(
      (res) => {
        alert('Movie Added Successfully');
        let ref = document.getElementById('cancel');
        ref?.click();
        this.formValue.reset();
        this.getMovies();
      },
      (err) => {
        alert('Something went wrong');
      }
    );
  }

  //to enter data in form for update
  onMovieEdit(mov: any) {
    this.showAdd = false;
    this.showUpdate = true;
    this.movieModelObject.movieId = mov.movieId;
    this.formValue.controls['movieName'].setValue(mov.movieName);
    this.formValue.controls['movieDescription'].setValue(mov.movieDescription);
    this.formValue.controls['movieDuration'].setValue(mov.movieDuration);
    this.formValue.controls['movieActionType'].setValue(mov.movieActionType);
    this.formValue.controls['movieTicketPrice'].setValue(mov.movieTicketPrice);
    this.formValue.controls['movieRating'].setValue(mov.movieRating);
    this.formValue.controls['movieAvilable'].setValue(mov.movieAvilable);
    this.formValue.controls['movieImagePath'].setValue(mov.movieImagePath);
  }

  //update movuct
  updateMovie() {
    if (
      !this.formValue.value.movieName ||
      !this.formValue.value.movieDescription ||
      !this.formValue.value.movieActionType ||
      !this.formValue.value.movieAvilable ||
      !this.formValue.value.movieImagePath ||
      !this.formValue.value.movieTicketPrice
    ) {
      this.message = 'Fields must not be empty';
      return;
    }
    this.movieModelObject.movieName = this.formValue.value.movieName;
    this.movieModelObject.movieDescription = this.formValue.value.movieDescription;
    this.movieModelObject.movieDuration = this.formValue.value.movieDuration;
    this.movieModelObject.movieActionType = this.formValue.value.movieActionType;
    this.movieModelObject.movieTicketPrice = this.formValue.value.movieTicketPrice;
    this.movieModelObject.movieRating = this.formValue.value.movieRating;
    this.movieModelObject.movieAvilable = this.formValue.value.movieAvilable;
    this.movieModelObject.movieImagePath = this.formValue.value.movieImagePath;

    this.movieService.updateMovie(this.movieModelObject)
      .subscribe(
        (res) => {
          alert('Movie Updated Successfully');
          //
          let ref = document.getElementById('cancel');
          ref?.click();
          this.formValue.reset();
          this.getMovies();
        },
        (err) => {
          alert('Something went wrong');
        }
      );
  }

  //delete movuct
  deleteMovie(movie: any) {
    this.movieService.deleteMovie(movie.movieId).subscribe(
      (res) => {
        alert('Movie Deleted');
        this.getMovies();
      },
      (err) => {
        alert('Something went wrong');
      }
    );
  }

  //admin logout
  adminLogout() {
    this.router.navigate(['/admin']);
  }
}

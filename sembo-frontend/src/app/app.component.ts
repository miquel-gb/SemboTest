import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { HotelsRatingPerCountry } from './hotels-rating.models';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  public countryList!: HotelsRatingPerCountry[];

  public loading: boolean = true;

  constructor(private _http: HttpClient) {
    
  }

  public ngOnInit() {
    this._http.get<HotelsRatingPerCountry[]>('http://localhost:3000/RetrieveHotelsData').subscribe(
      (response: HotelsRatingPerCountry[]) => {
        this.countryList = response;
        this.loading = false;
      }
    );
  }
}

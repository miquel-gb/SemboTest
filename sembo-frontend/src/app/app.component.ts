import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { HotelsRatingPerCountry } from './hotels-rating.models';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  /**
   * List of countries to display
   */
  public countryList!: HotelsRatingPerCountry[];
  /**
   * Flag to check whether the data is still loading
   */
  public loading: boolean = true;

  /**
   * Default constructor
   * @param _http Angular's HttpClient service
   */
  constructor(private _http: HttpClient) {
    
  }

  /**
   * Angular OnInit lifecycle hook, calls the API to retrieve the data
   */
  public ngOnInit() {
    this._http.get<HotelsRatingPerCountry[]>('http://localhost:3000/RetrieveHotelsData').subscribe(
      (response: HotelsRatingPerCountry[]) => {
        this.countryList = response;
        this.loading = false;
      }
    );
  }
}

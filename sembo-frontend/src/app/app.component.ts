import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  public response: any;

  constructor(private _http: HttpClient) {
    this._http.get('http://localhost:3000/test').subscribe(
      (response) => {
        this.response = response;
      }
    )
  }
}

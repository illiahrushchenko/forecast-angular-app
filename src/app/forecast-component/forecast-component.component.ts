import { HttpClient, HttpParams } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-forecast-component',
  standalone: true,
  imports: [],
  templateUrl: './forecast-component.component.html',
  styleUrl: './forecast-component.component.less'
})
export class ForecastComponentComponent {
  constructor(private _http: HttpClient) {
    this.responseAdress = '';
  }

  responseAdress: string;

  public makeRequest() {
    this._http.get<IWeatherResponse>('https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/Vinnytsia/2024-09-18/2024-09-25', {
      params: new HttpParams()
        .set('unitGroup', 'metric')
        .set('include', 'days')
        .set('key', '5NCNZB7M4J2ZRZ6HDCZ5M8HCG')
        .set('contentType', 'json')
    })
    .subscribe(data => {
      this.responseAdress = data.timezone;
    });
  }
}


interface IWeatherResponse {
  address: string
  timezone: string
}

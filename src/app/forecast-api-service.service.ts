import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IWeatherResponse } from './interfaces/IWeatherResponse';
import { API_KEY } from './constants/secrets';

@Injectable({
  providedIn: 'root'
})
export class ForecastApiService {

  constructor(
    private _http: HttpClient) { }

  getDays(days: number, city: string): Observable<IWeatherResponse> {
      let startDate = new Date();
      let endDate = new Date();
      endDate.setDate(startDate.getDate() + days);

      let startDateString = this.parseDate(startDate);
      let endDateString = this.parseDate(endDate);
      return this.getData(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}/${startDateString}/${endDateString}`);
  }

  parseDate(date: Date): string {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');

      return `${year}-${month}-${day}`;
  }

  private getData(url: string): Observable<IWeatherResponse>{
      return this._http.get<IWeatherResponse>(url, {
          params: new HttpParams()
            .set('unitGroup', 'metric')
            .set('include', 'days')
            .set('key', API_KEY)
            .set('contentType', 'json')
        });
  }
}

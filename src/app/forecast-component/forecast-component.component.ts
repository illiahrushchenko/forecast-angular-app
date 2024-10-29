import { HttpClient, HttpParams } from '@angular/common/http';
import { Component } from '@angular/core';
import { IWeatherResponse } from '../interfaces/IWeatherResponse';
import { ForecastApiService } from '../forecast-api-service.service';
import { ICON_PATH } from '../constants/iconNamePathDictionary';
import { BACKGROUND_PATH } from '../constants/backgroundNamePathDictionary';

@Component({
  selector: 'app-forecast-component',
  standalone: true,
  imports: [],
  templateUrl: './forecast-component.component.html',
  styleUrl: './forecast-component.component.less'
})
export class ForecastComponentComponent {
  constructor(private _forecastDataService: ForecastApiService) {
    this.responseAdress = '';
  }

  responseAdress: string;
  weatherData: IWeatherResponse | undefined;
  iconPathDict = ICON_PATH;
  backgroundPathDict = BACKGROUND_PATH;

  public makeRequest() {
    this._forecastDataService.getDays(6)
      .subscribe(data => {

        let dataWithDates = data.days.map(x => {
          const date = new Date(x.datetime);
          const options: Intl.DateTimeFormatOptions = { weekday: 'long' }; 
          x.dayName = date.toLocaleDateString('uk-UA', options);
          return x;
        });
        data.days = dataWithDates;

        this.weatherData = data;
      });
  }
}
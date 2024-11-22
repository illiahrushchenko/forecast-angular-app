import { HttpClient, HttpParams } from '@angular/common/http';
import { NgClass } from '@angular/common';
import { CommonModule } from '@angular/common'; 
import { Component } from '@angular/core';
import { IWeatherResponse } from '../interfaces/IWeatherResponse';
import { ForecastApiService } from '../forecast-api-service.service';
import { ICON_PATH } from '../constants/iconNamePathDictionary';
import { BACKGROUND_PATH } from '../constants/backgroundNamePathDictionary';
import { BIG_ICONS } from '../constants/bigIconNamePathDictionary';

@Component({
  selector: 'app-forecast-component',
  standalone: true,
  imports: [NgClass, CommonModule],
  templateUrl: './forecast-component.component.html',
  styleUrl: './forecast-component.component.less'
})
export class ForecastComponentComponent {
  constructor(private _forecastDataService: ForecastApiService) {
    this.responseAdress = '';
    this.dayIndexState = 0;
  }

  dayIndexState: number;

  audio: HTMLAudioElement | undefined;

  responseAdress: string;
  weatherData: IWeatherResponse | undefined;
  iconPathDict = ICON_PATH;
  backgroundPathDict = BACKGROUND_PATH;
  bigIcons = BIG_ICONS;

  public makeRequest() {
    if(!this.audio)
      this.audio = new Audio('assets/audio/DZIDZIO – Вихідний.mp3');

    this.audio.play();


    this._forecastDataService.getDays(6)
      .subscribe(data => {

        let processedDaysData = data.days.map(x => {
          const date = new Date(x.datetime);
          const options: Intl.DateTimeFormatOptions = { weekday: 'long' }; 
          x.dayName = date.toLocaleDateString('uk-UA', options);

          x.parsedDate = date.toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit' });

          return x;
        });
        data.days = processedDaysData;

        this.weatherData = data;
      });
      //TODO: unsubscribe in destructor
  }

  public trackDay(index: number, day: any): string {
    return day.datetime; 
  }

  public changeDayIndexState(index: number){
    this.dayIndexState = index;
  }
}
import { HttpClient, HttpParams } from '@angular/common/http';
import { NgClass } from '@angular/common';
import { CommonModule } from '@angular/common'; 
import { Component } from '@angular/core';
import { IWeatherResponse } from '../interfaces/IWeatherResponse';
import { ForecastApiService } from '../forecast-api-service.service';
import { ICON_PATH } from '../constants/iconNamePathDictionary';
import { BACKGROUND_PATH } from '../constants/backgroundNamePathDictionary';
import { BIG_ICONS } from '../constants/bigIconNamePathDictionary';
import { CitySelectComponent } from "../city-select/city-select.component";
import { Subject, takeUntil } from 'rxjs';
import { MUSIC_NAME_DICTIONARY, MUSIC_NAME_PATH_DICTIONARY } from '../constants/musicNameDictionary';

@Component({
  selector: 'app-forecast-component',
  standalone: true,
  imports: [NgClass, CommonModule, CitySelectComponent],
  templateUrl: './forecast-component.component.html',
  styleUrl: './forecast-component.component.less'
})
export class ForecastComponentComponent {
  constructor(private _forecastDataService: ForecastApiService) {
    this.responseAdress = '';
    this.dayIndexState = 0;
  }

  private destroy$ = new Subject<void>();

  dayIndexState: number;

  private audio: HTMLAudioElement | undefined;
  audioContext: AudioContext | undefined;
  analyser: AnalyserNode | undefined;
  dataArray: Uint8Array | undefined;
  animationFrameId: number | undefined;
  volume: number = 0;


  responseAdress: string;
  weatherData: IWeatherResponse | undefined;

  iconPathDict = ICON_PATH;
  backgroundPathDict = BACKGROUND_PATH;
  bigIcons = BIG_ICONS;

  isModalOpen = false;
  selectedCity = '';

  ngOnInit(): void {
    //this.audio = new Audio();
    this.setupAudio();
    this.selectedCity = 'Вінниця';
    this.makeRequest();
  }

  setupAudio() {
    if (typeof window !== 'undefined') {
      this.audio = new Audio();
    
      this.audioContext = new AudioContext();
      const source = this.audioContext.createMediaElementSource(this.audio);
      this.analyser = this.audioContext.createAnalyser();

      // Connect the analyser to the destination (speakers)
      source.connect(this.analyser);
      this.analyser.connect(this.audioContext.destination);

      // Set up the frequency data array
      this.analyser.fftSize = 256;
      const bufferLength = this.analyser.frequencyBinCount;
      this.dataArray = new Uint8Array(bufferLength);
      this.animate();
    } else {
      console.warn('Audio is not available in the current environment.');
    }
  }

  animate() {
    if (this.analyser && this.dataArray)
    {
      // Get frequency data from the analyser
      this.analyser.getByteFrequencyData(this.dataArray);

      // Calculate the volume based on frequency data
      let sum = 0;
      for (let i = 0; i < this.dataArray.length; i++) {
        sum += this.dataArray[i];
      }
      this.volume = sum / this.dataArray.length;

      // Update animation based on volume
      this.updateAnimation();

      // Call animate again in the next frame
      this.animationFrameId = requestAnimationFrame(() => this.animate());
    }
  }

  updateAnimation() {
    const scale = Math.min(1 + this.volume / 255, 2); // Volume between 0 and 255, so scale between 1 and 2
    // const element = document.querySelector('.animated-element');

    // if (element instanceof HTMLElement) {
    //   element.style.transform = `scale(${scale})`; // Apply the scaling
    //   element.style.transition = 'transform 0.1s ease-out'; // Optional: Add a smooth transition
    // }

    const element2 = document.querySelector('.big-icon');

    if (element2 instanceof HTMLElement) {
      element2.style.transform = `scale(${scale})`; // Apply the scaling
      element2.style.transition = 'transform 0.1s ease-out'; // Optional: Add a smooth transition
    }
  }

  openCityModal(): void {
    this.isModalOpen = true;
  }

  handleModalClose(): void {
    this.isModalOpen = false;
  }

  handleCitySelection(city: string): void {
    this.selectedCity = city;
    this.makeRequest();
  }

  public makeRequest() {
    this._forecastDataService.getDays(6, this.selectedCity)
      .pipe(takeUntil(this.destroy$))
      .subscribe(data => {

        let processedDaysData = data.days.map(x => {
          const date = new Date(x.datetime);
          const options: Intl.DateTimeFormatOptions = { weekday: 'long' }; 
          x.dayName = date.toLocaleDateString('uk-UA', options);

          x.parsedDate = date.toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit' });

          return x;
        });
        data.days = processedDaysData;

        var musicPathArray = MUSIC_NAME_PATH_DICTIONARY[MUSIC_NAME_DICTIONARY[data?.days?.[0]?.icon ?? '']];
        // if(!this.audio)
        // {
        //     this.setupAudio();
        // }
        // this.setupAudio();
        if(this.audio)
        {
          this.audio.src = musicPathArray[Math.floor(Math.random() * musicPathArray.length)];
          this.audio.play();
        }

        this.weatherData = data;
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public trackDay(index: number, day: any): string {
    return day.datetime; 
  }

  public changeDayIndexState(index: number){
    this.dayIndexState = index;
  }
}
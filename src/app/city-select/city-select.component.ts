import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ForecastApiService } from '../forecast-api-service.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-city-select',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './city-select.component.html',
  styleUrl: './city-select.component.less'
})
export class CitySelectComponent {

  constructor(private _forecastDataService: ForecastApiService){
    
  }

  @Input() isOpen = false;
  @Output() closeModal = new EventEmitter<void>(); 
  @Output() citySelected = new EventEmitter<string>();

  private storageKey = 'cities';

  cities = ['Вінниця'];
  selectedCity: string = '';
  newCity: string = '';

  private destroy$ = new Subject<void>();

  ngOnInit(): void {
    // Load cities from localStorage or use a default list
    const savedCities = localStorage.getItem(this.storageKey);
    this.cities = savedCities ? JSON.parse(savedCities) : ['Вінниця'];
  }

  onCloseModal(): void {
    this.closeModal.emit(); // Emit event to notify parent
  }

  onSelectCity(city: string): void {
    this.citySelected.emit(city); // Emit event to notify parent about selection
    this.onCloseModal(); // Close modal after selection
  }

  addCity(): void {
    // Check if the city name is not empty and not already in the list
    if (this.newCity.trim() && !this.cities.includes(this.newCity.trim())) {
      this._forecastDataService.getDays(0, this.newCity.trim())
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data) => {
          this.cities.push(this.newCity.trim());
          this.newCity = '';
          this.saveCitiesToStorage();
        },
        error: (error) => {
          alert('Значення не валідне!');
        }
      });
    } else {
      alert('Значення має бути валідним та унікальним!');
    }
  }  

  private saveCitiesToStorage(): void {
    localStorage.setItem(this.storageKey, JSON.stringify(this.cities));
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}

import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ForecastComponentComponent } from "./forecast-component/forecast-component.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ForecastComponentComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.less'
})
export class AppComponent {
  title = 'forecast-angular-app';
}

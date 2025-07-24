import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router'
import { LoaderComponent } from "./shared/ui/loader/loader.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, LoaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'clinic-admin';

}

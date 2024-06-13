import { RouterOutlet } from '@angular/router';
import { initFlowbite } from 'flowbite';
import { Component, OnInit } from '@angular/core'; // Ensure you have this import
import { NavbarComponent } from './navbar/navbar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,NavbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'MVD-UI';

  ngOnInit(): void {
    // initFlowbite();
  }
}

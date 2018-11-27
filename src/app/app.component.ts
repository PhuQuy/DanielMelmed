import { Component } from '@angular/core';
import { AuthService } from './stork_features/shared/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers:[AuthService]
})
export class AppComponent {
  title = 'app';
}

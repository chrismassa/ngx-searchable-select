import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxSearchableSelectComponent } from 'ngx-searchable-select';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, NgxSearchableSelectComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'showcase';
}

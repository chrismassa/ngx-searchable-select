import { map } from 'rxjs';
import { Component, inject } from '@angular/core';
import { NgxSearchableSelectComponent } from 'ngx-searchable-select';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AsyncPipe, JsonPipe, NgIf } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    NgxSearchableSelectComponent,
    ReactiveFormsModule,
    HttpClientModule,
    AsyncPipe,
    JsonPipe,
    NgIf
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  http = inject(HttpClient);

  form = new FormGroup({
    user: new FormControl(null, Validators.required),
    todo: new FormControl(null, Validators.required),
    comment: new FormControl(null, Validators.required),
  })

  users$ = this.http.get<User[]>('https://jsonplaceholder.typicode.com/users').pipe(map(users => users.map(({ username }) => username)));
  todos$ = this.http.get<any[]>('https://jsonplaceholder.typicode.com/todos');
  comments$ = this.http.get<any[]>('https://jsonplaceholder.typicode.com/comments');

}

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    }
  },
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  }
}

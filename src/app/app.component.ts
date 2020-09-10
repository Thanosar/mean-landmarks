import {Component, OnInit} from '@angular/core';
import {AuthService} from './core/services/auth.service';
import {IJsonResponse} from './core/interfaces/IJsonResponse';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'dubai';


  constructor(private authService: AuthService) {
  }

  ngOnInit(): void {
    const token = window.localStorage.getItem("token");
    this.authService.isLoggedIn(token).subscribe((res: IJsonResponse) => {
     if (res.success) {
       this.authService.user = res.data;
     }
    });
  }
}

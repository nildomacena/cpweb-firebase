import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services';
import { Router } from '@angular/router';

@Component({
  selector: 'cp-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{
  user: any = null;
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.authService.isAuthenticated()
      .subscribe(value => {
        this.user = value;
    });
  }

  isAuth(){
    return this.authService.isAuthenticated();
  }
  onLogout(){
    this.authService.logout()
      .then(() => this.router.navigate([""]))
      .catch( error => console.log(error));
  }

}

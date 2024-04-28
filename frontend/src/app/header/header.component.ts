import {
  BreakpointObserver,
  Breakpoints,
} from '@angular/cdk/layout';
import {
  Component,
  EventEmitter,
  OnInit,
  Output,
} from '@angular/core';
import { Router } from '@angular/router';

import {
  map,
  Observable,
  shareReplay,
} from 'rxjs';

import { user } from '../models/user';
import { authService } from '../services/auth.service';
import { NotificationService } from '../services/notification.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {


  currentUser: user;

  notifications: any;
  notifCount: number;

  constructor(private breakpointObserver: BreakpointObserver, private authService: authService, 
    private router: Router, private notificationService: NotificationService) { 

      this.currentUser = this.authService.userName;
      
    }

  isAuthenticated = false;

  ngOnInit(): void {

    this.authService.isUserLoggedIn$.subscribe((isLoggedIn) => {
      this.isAuthenticated = isLoggedIn;


      this.notificationService.getNotifications().subscribe((data: any) => {
        this.notifications = data;
        this.notifCount = data.totalItems;
      })
      
    })
  }
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
  .pipe(
    map(result => result.matches),
    shareReplay()
  );

  @Output() toggle: EventEmitter<any> = new EventEmitter();

  toggleSidebar(){
    this.toggle.emit();
  }

  logout(): void {
    localStorage.removeItem("token");
    this.authService.isUserLoggedIn$.next(false);   //update status of the user
    this.router.navigate(["login"])
  }

  

 
}

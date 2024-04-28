import {
  Component,
  OnInit,
} from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';

import { user } from '../models/user';
import { authService } from '../services/auth.service';
import { UsersService } from '../services/users.service';
import { DialogProfComponent } from './dialog-prof/dialog-prof.component';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit {

  userName: user;
  userType: user;
  email: user;
  userId: user;

  myForm: FormGroup;
  successMessage = ''
  
  constructor(private authService: authService, private usersService: UsersService, private matDialog: MatDialog) {
    this.userName = this.authService.userName;
    this.userType = this.authService.userType;
    this.email = this.authService.email;
    this.userId = this.authService.id;

    this.myForm = new FormGroup({
      userName: new FormControl(null),
      pwd: new FormControl('', Validators.minLength(6)),
      cnfPassword: new FormControl('', this.passValidator),
    });

    this.myForm.controls['pwd'].valueChanges
    .subscribe(
      x => this.myForm.controls['cnfPassword'].updateValueAndValidity())
   }

  avatar:string = "assets/images/avatar.jpg";
  Roles: any = ['Administrateur','employe'];
  ngOnInit(): void {
  }

  isValid(controlName){
    return this.myForm.get(controlName).invalid && this.myForm.get(controlName).touched;
  }


sideBarOpen =true;
  sideBarToggler(){
    this.sideBarOpen = !this.sideBarOpen;
}


hide= true;



  passValidator(control: AbstractControl) {
    if(control && (control.value !== null || control.value !== undefined)){ //check if the value not null
      const cnfpassValue = control.value;
      const passControl = control.root.get('pwd'); //get the value of pwd
      if(passControl !== null){
        const passValue = passControl.value;
        if(passValue !== cnfpassValue || passValue !== '' ){     //if pass and cnfpass does not match
          return {                                              //then error
            isError: true
          };
        }
      }
      return null;
    }
    return null;
  }


  updateData(){
    console.log(this.myForm.value);
    if(this.myForm.valid){
      this.usersService.updateUser(this.myForm.value, this.userId)
      .subscribe(
        data => this.matDialog.open(DialogProfComponent,
          {
            width: "500px",
            panelClass: 'confirm-dialog-container'
          },
         ),
        error => this.successMessage = 'some error'
      );
    }
}
}

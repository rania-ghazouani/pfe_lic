import {
  Component,
  OnInit,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';

import { authService } from '../services/auth.service';
import { DialogComponent } from './dialog/dialog.component';

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.css']
})
export class ForgotComponent implements OnInit {

  myForm: FormGroup;
  successMessage= '';
  constructor(private _services: authService, private matDialog: MatDialog) {
    this.myForm = new FormGroup({
      email: new FormControl(null, Validators.email)
    });
   }
  resetBg:string = "assets/images/reset-password.svg";

  ngOnInit(): void {
  }

  isValid(controlName){
    return this.myForm.get(controlName).invalid && this.myForm.get(controlName).touched;
  }

  
  forgot() {
    console.log(this.myForm.value);
    if(this.myForm.valid){
    this._services.forgot(this.myForm.value)
    .subscribe(
      data => this.matDialog.open(DialogComponent,
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

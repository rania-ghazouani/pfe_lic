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
import { ActivatedRoute } from '@angular/router';

import { user } from '../models/user';
import { authService } from '../services/auth.service';

@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.css']
})
export class ResetComponent implements OnInit {

  myForm: FormGroup;
  successMessage = ''
  resetLink: Pick<user, "resetLink">

  constructor(private _services: authService, private route: ActivatedRoute) {

    this.myForm = new FormGroup({
      pwd: new FormControl(null, Validators.required),
      cnfPassword: new FormControl(null, this.passValidator)
    });

    this.myForm.controls['pwd'].valueChanges
    .subscribe(
      x => this.myForm.controls['cnfPassword'].updateValueAndValidity()    //when the password changes, the cnfpass will be excuted again
    );
   }

  resetBg:string = "assets/images/reset-password.svg";
  ngOnInit(): void {
  }
  hide = true;

  isValid(controlName){
    return this.myForm.get(controlName).invalid && this.myForm.get(controlName).touched;
  }


  passValidator(control: AbstractControl) {
    if(control && (control.value !== null || control.value !== undefined)){ //check if the value not null
      const cnfpassValue = control.value;

      const passControl = control.root.get('pwd'); //get the value of passControl
      if(passControl){
        const passValue = passControl.value;
        if(passValue !== cnfpassValue || passValue === ''){     //if pass and cnfpass does not match
          return {                                              //then error
            isError: true
          };
        }
      }
    }
    return null;
  }
  reset(resetLink: Pick<user, "resetLink">): void {
    
    
    this._services.reset(resetLink,this.myForm.value)
    .subscribe(
      data => this.successMessage = "mot de passe a été mise à jour avec succés",
        error => this.successMessage = "erreur de mise a jour de mot de passe"
    )
  }
}

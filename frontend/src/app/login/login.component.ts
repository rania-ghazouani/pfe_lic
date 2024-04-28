import {
  Component,
  OnInit,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import {
  ActivatedRoute,
  Router,
} from '@angular/router';

import { authService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginBg:string = "assets/images/statbg.jpg";
  myForm: FormGroup;
  successMessage = '';

  constructor(private _services: authService, private router: Router, 
              private activatedRoute: ActivatedRoute) {
    this.myForm = new FormGroup({
      email: new FormControl(null, [Validators.email, Validators.required]),
      pwd: new FormControl(null, [Validators.required, Validators.minLength(6)])
    });

    localStorage.clear()
   }

  ngOnInit(): void {
  }

  isValid(controlName){
    return this.myForm.get(controlName).invalid && this.myForm.get(controlName).touched;
  }

  hide = true

  
login(){
  console.log(this.myForm.value);
  if(this.myForm.valid){
    this._services.login(this.myForm.value.email, this.myForm.value.pwd)
    .subscribe({
      next:(res) => {
        alert('utilisateur connecté.');
      },
      error:() => {
        alert('erreur de connexion, verifiez vos coordonnées.');
      }
    })
  }
}
}

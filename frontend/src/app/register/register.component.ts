import {
  Component,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { Observable } from 'rxjs';

import { user } from '../models/user';
import { authService } from '../services/auth.service';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  products: Observable<user[]>
  
  dataSource: MatTableDataSource<user>;
  colomnsToDisplay: String[] = ['userId','userName','email','userType','actions']
  
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  myForm: FormGroup;

  successMessage = '';

  constructor(private _services: authService, private usersService: UsersService) {
    this.myForm = new FormGroup({
      userName: new FormControl(null, Validators.required),
      email: new FormControl(null, [Validators.email, Validators.required]),
      pwd: new FormControl(null, [Validators.required, Validators.minLength(6)]),
      cnfPassword: new FormControl(null, this.passValidator),
      userType: new FormControl(null, Validators.required)
    });

    this.myForm.controls['pwd'].valueChanges
    .subscribe(
      x => this.myForm.controls['cnfPassword'].updateValueAndValidity()    //when the password changes, the cnfpass will be excuted again
    );
   }
  registerBg:string = "assets/images/register.jpg";
  userType: any = ['administrateur','employe'];


  ngOnInit(): void {
    this.getAllUsers();
  }


  sideBarOpen =true;
  sideBarToggler(){
    this.sideBarOpen = !this.sideBarOpen;
}

  hide= true;

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

  register(){
    console.log(this.myForm.value);
    if(this.myForm.valid){
      this._services.register(this.myForm.value)
      .subscribe(
        data => this.successMessage = "utilisateur enregistré avec succés",
        
      );
    } else {
      this.successMessage = "veuiller verifier les champs"
    }
  }

  deleteUser(userId: Pick<user, "userId">): void{
    if(confirm(`vous êtes sure de vouloir supprimer utilisateur ${userId}`)){
    this.usersService.deleteUser(userId).subscribe({
      next:(res) => {
        alert('utilisateur supprimé.');
      },
      error:() => {
        alert('erreur lors du suppression');
      }
    })
  }
  }

  getAllUsers(){
    this.usersService.getUsers()
    .subscribe({
      next:(res) =>{
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      error:(err) =>{
        alert("errorwhile fetching");
      }
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}

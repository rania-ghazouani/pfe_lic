import {
  Component,
  OnInit,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

import {
  first,
  Observable,
} from 'rxjs';
import { categoryProduct } from 'src/app/models/category';
import { authService } from 'src/app/services/auth.service';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-dialog-categ',
  templateUrl: './dialog-categ.component.html',
  styleUrls: ['./dialog-categ.component.css']
})
export class DialogCategComponent implements OnInit {

  categories: Observable<categoryProduct[]>;
  

  myForm: FormGroup;
  successMessage= '';

  constructor(private categServices: CategoryService,private authService: authService, private dialogRef: MatDialogRef<DialogCategComponent>) {
    this.myForm = new FormGroup({
      categoryName: new FormControl(null, Validators.required),
      
    });
   }
   

  ngOnInit(): void {
  }

  isValid(controlName){
    return this.myForm.get(controlName).invalid && this.myForm.get(controlName).touched;
  }

  save(formData: Omit<categoryProduct, "categoryId">){
    console.log(this.myForm.value);
    if(this.myForm.valid){
    this.categServices.createCategory(formData).pipe(first())
    .subscribe(
      data => this.successMessage = "produit enregistré avec succés",
      error => this.successMessage = 'erreur'
    );
    this.myForm.reset();
    this.dialogRef.close('save');
  }
}


}

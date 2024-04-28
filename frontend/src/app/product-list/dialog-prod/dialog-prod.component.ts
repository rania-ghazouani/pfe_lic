import {
  Component,
  Inject,
  OnInit,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';

import {
  first,
  Observable,
} from 'rxjs';
import { product } from 'src/app/models/product';
import { authService } from 'src/app/services/auth.service';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';

import { DialogConfComponent } from '../dialog-conf/dialog-conf.component';

@Component({
  selector: 'app-dialog-prod',
  templateUrl: './dialog-prod.component.html',
  styleUrls: ['./dialog-prod.component.css']
})
export class DialogProdComponent implements OnInit {

  products: Observable<product[]>;


  myForm: FormGroup;
  successMessage = '';

  actionBtn: String = "enregistrer"
  title: String = "ajouter un nouveau produit"
  categories: any

 


  constructor(private _services: ProductService, private authService: authService,private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public editData: any,
    private dialogRef: MatDialogRef<DialogProdComponent>, private categService: CategoryService) {


    this.myForm = new FormGroup({
      productName: new FormControl(null, Validators.required),
      prodEnteredId: new FormControl(null, Validators.required),
      productQuantity: new FormControl(null, Validators.required),
      productPrice: new FormControl(null, Validators.required),
      productDescription: new FormControl(null),
      productMin: new FormControl(null, Validators.required),
      isArchived: new FormControl(),
      categoryId: new FormControl(null, Validators.required)
    });

    if (this.editData) {
      this.actionBtn = "modifier";
      this.title = 'modifier un produit'
      this.myForm.controls['prodEnteredId'].setValue(this.editData.prodEnteredId);
      this.myForm.controls['productName'].setValue(this.editData.productName);
      this.myForm.controls['productQuantity'].setValue(this.editData.productQuantity);
      this.myForm.controls['productPrice'].setValue(this.editData.productPrice);
      this.myForm.controls['productDescription'].setValue(this.editData.productDescription);
      this.myForm.controls['productMin'].setValue(this.editData.productMin);
      this.myForm.controls['isArchived'].setValue(this.editData.isArchived);
    }
  }

  
  changeCategory(e){
    console.log(e.target.value);
  }

  ngOnInit(): void {

    
      this.categService.getCategories().subscribe((data: any) => {
        this.categories = data;
      })
      
    
  }


  isValid(controlName) {
    return this.myForm.get(controlName).invalid && this.myForm.get(controlName).touched;
  }

  
  save(formData: Omit<product, "productId, isArchived, creationDate, updateDate">) {
    console.log(this.myForm.value);
    if (!this.editData) {
      if (this.myForm.valid) {
        this._services.createProduct(formData).pipe(first())
          .subscribe({
            next:(res) => {
              this.dialog.open(DialogConfComponent, {
                width: '20%'
              }).afterClosed().subscribe()
            },
            error:() => {
             alert('erreur')
            }
          } 
          );
        this.myForm.reset();
        this.dialogRef.close('save');
      }
    } else {
      this.updateProduct()
    }
  }




  updateProduct() {
    this._services.updateProduct(this.myForm.value, this.editData.productId).subscribe({
      next: (res) => {
        alert("Produit a été mis à jour");
        this.myForm.reset();
        this.dialogRef.close('modifier');
      },
      error: () => {
        alert("error lors de la modification");
      }
    })
  }


}

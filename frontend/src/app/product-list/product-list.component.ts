import {
  Component,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';

import { Observable } from 'rxjs';
import { authService } from 'src/app/services/auth.service';

import { notification } from '../models/notification';
import { product } from '../models/product';
import { user } from '../models/user';
import { NotificationService } from '../services/notification.service';
import { ProductService } from '../services/product.service';
import { DialogProdComponent } from './dialog-prod/dialog-prod.component';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  userId: user;
  userName: user;



  productMin: product;
  productQuantity: product;

  productId: Pick<notification, "productId">

  constructor(private _service: ProductService, private dialog: MatDialog, private authService: authService,
  private notificationService: NotificationService, private router: Router) {

      this.userId = this.authService.id;
      this.userName = this.authService.userName
    
   }

  products$: Observable<product[]>
  
 
  
  dataSource: MatTableDataSource<product>;

  colomnsToDisplay: String[] = ['productId','prodEnteredId','productName','productDescription',
  'productQuantity','productPrice','productMin','isArchived','creationDate','updateDate', 'category', 
  'user', 'actions']
  
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  
  ngOnInit(): void {
  this.getAllProducts();
  
    
  }


  sideBarOpen =true;
  sideBarToggler(){
    this.sideBarOpen = !this.sideBarOpen;
  }

  openDialog() {
    this.dialog.open(DialogProdComponent, {
      width: '30%'
    }).afterClosed().subscribe(val => {
      if(val === 'enregistrer'){
        this.getAllProducts();
      }
    })
  }
    
  
  getAllProducts(){
    this._service.getProducts()
    .subscribe({
      next:(res) =>{
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error:(err) =>{
        alert("errorwhile fetching");
      }
    })
  }

  deleteProduct(productId: Pick<product, "productId">): void{
    if(confirm(`vous êtes sure de vouloir supprimer produit ${productId}`)){
    this._service.deleteProduct(productId).subscribe({
      next:(res) => {
        alert('produit supprimé.');
      },
      error:() => {
        alert('erreur lors du suppression');
      }
    })
  }
  }



  editProduct(productId: Pick<product, "productId">){
    
    
    this.dialog.open(DialogProdComponent,{
      width: '30%',
      data:productId
    }).afterClosed().subscribe( val => {
      if(val === 'modifier'){
        this.getAllProducts();
      }
    }
    )
}

archiveProduct(productId: Pick<product, "productId">){
  this._service.archiveProduct(productId).subscribe({
    next: (res) => {
      alert("Produit a été mis à jour");
      this.getAllProducts();
    },
    error: () => {
      alert("error lors de la modification");
    }
  })
}


alert( productId: Pick<product, "productId">){
        if(this.productMin > this.productQuantity){
          console.log(this.productMin)
  this.notificationService.createNotification().subscribe({
    next: (res) => {
      console.log(`notification envoyé pour le produit ${productId}`);
      
    },
    error: () => {
      console.log(`error lors de l'envoi pour le produit ${productId}`);
    }
  
  })
        }
  
}

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}

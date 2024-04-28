import {
  Component,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { Observable } from 'rxjs';
import { authService } from 'src/app/services/auth.service';

import { categoryProduct } from '../models/category';
import { CategoryService } from '../services/category.service';
import { DialogCategComponent } from './dialog-categ/dialog-categ.component';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {

  constructor(private categService: CategoryService, private dialog: MatDialog, private authService: authService) { }

  ngOnInit(): void {
    this.getAllCategories();
  }

  products: Observable<categoryProduct[]>
  
  dataSource: MatTableDataSource<categoryProduct>;
  colomnsToDisplay: String[] = ['categoryId','categoryName']
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;


  openDialog() {
    this.dialog.open(DialogCategComponent, {
      width: '30%'
    });
  }
    getAllCategories(){
    this.categService.getCategories()
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

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}

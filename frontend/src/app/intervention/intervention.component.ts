import {
  Component,
  OnInit,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { DialogInterComponent } from './dialog-inter/dialog-inter.component';

@Component({
  selector: 'app-intervention',
  templateUrl: './intervention.component.html',
  styleUrls: ['./intervention.component.css']
})
export class InterventionComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  sideBarOpen =true;
  sideBarToggler(){
    this.sideBarOpen = !this.sideBarOpen;
  }
  openDialog() {
    this.dialog.open(DialogInterComponent, {
      width: '30%'
    });
  }

}

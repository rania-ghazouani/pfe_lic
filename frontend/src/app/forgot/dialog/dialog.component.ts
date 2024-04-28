import {
  Component,
  Inject,
  OnInit,
} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
} from '@angular/material/dialog';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) private data: String, 
              private matDialogRef: MatDialogRef<DialogComponent>) { }

  ngOnInit(): void {
  }
ngOnDestroy(){
  this.matDialogRef.close(this.data)
}
}

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
  selector: 'app-dialog-prof',
  templateUrl: './dialog-prof.component.html',
  styleUrls: ['./dialog-prof.component.css']
})
export class DialogProfComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) private data: String, 
  private matDialogRef: MatDialogRef<DialogProfComponent>) { }

ngOnInit(): void {
}
ngOnDestroy(){
this.matDialogRef.close(this.data)
}
}

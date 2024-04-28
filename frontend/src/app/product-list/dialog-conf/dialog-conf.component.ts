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
  selector: 'app-dialog-conf',
  templateUrl: './dialog-conf.component.html',
  styleUrls: ['./dialog-conf.component.css']
})
export class DialogConfComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) private data: String, 
  private matDialogRef: MatDialogRef<DialogConfComponent>) { }

ngOnInit(): void {
}
ngOnDestroy(){
this.matDialogRef.close(this.data)
}

}

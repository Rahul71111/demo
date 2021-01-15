import { ConfirmDialogModel, ConfirmComponent } from './../components/confirm/confirm.component';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Injectable({
  providedIn: 'root'
})
export class ConfirmService {

  constructor(private dialog: MatDialog) { }

  public confirm(message:string,title:string){

    const dialogData = new ConfirmDialogModel(title, message);

    const dialogRef = this.dialog.open(ConfirmComponent, {
      maxWidth: "400px",
      data: dialogData
    });

    return dialogRef.afterClosed()
  }
}

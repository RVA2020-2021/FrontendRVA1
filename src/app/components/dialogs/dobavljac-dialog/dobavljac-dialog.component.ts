import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Dobavljac } from 'src/app/models/dobavljac';
import { DobavljacService } from 'src/app/services/dobavljac.service';

@Component({
  selector: 'app-dobavljac-dialog',
  templateUrl: './dobavljac-dialog.component.html',
  styleUrls: ['./dobavljac-dialog.component.css']
})
export class DobavljacDialogComponent implements OnInit {

  public flag: number;
  
  constructor(public snackBar: MatSnackBar,
              public dialogRef: MatDialogRef<DobavljacDialogComponent>,
              @Inject (MAT_DIALOG_DATA) public data: Dobavljac,
              public dobavljacService: DobavljacService) { }

  ngOnInit(): void {
  }

  public add() : void {
    this.dobavljacService.addDobavljac(this.data).subscribe(() => {
      this.snackBar.open('Uspešno dodat dobavljač: ' + this.data.naziv, 'OK', {
        duration: 2500
      })
    }),
    (error:Error) => {
      console.log(error.name + ' ' + error.message);
      this.snackBar.open('Došlo je do greške prilikom dodavanja novog dobavljača.', 'Zatvori', {
        duration: 2500
      })
      
    }
  }
  public update(): void {
    this.dobavljacService.updateDobavljac(this.data).subscribe(() => {
      this.snackBar.open('Uspešno modifikovan dobavljač: ' + this.data.naziv, 'OK', {
        duration: 2500
      })
    }),
    (error:Error) => {
      console.log(error.name + ' ' + error.message);
      this.snackBar.open('Došlo je do greške prilikom izmene dobavljača.', 'Zatvori', {
        duration: 2500
      })
      
    }
  }
  public delete(): void {
    this.dobavljacService.deleteDobavaljac(this.data.id).subscribe(() => {
      this.snackBar.open('Uspešno obrisan dobavljač: ' + this.data.naziv, 'OK', {
        duration: 2500
      })
    }),
    (error:Error) => {
      console.log(error.name + ' ' + error.message);
      this.snackBar.open('Došlo je do greške prilikom brisanja dobavljača.', 'Zatvori', {
        duration: 2500
      })
      
    }
  }
  public cancel(): void {
    this.dialogRef.close();
    this.snackBar.open('Odustali ste.', 'Zatvori', {
      duration: 1000
    })
      
  }
}

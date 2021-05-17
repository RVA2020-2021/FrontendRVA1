import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Artikl } from 'src/app/models/artikl';
import { ArtiklService } from 'src/app/services/artikl.service';

@Component({
  selector: 'app-artikl-dialog',
  templateUrl: './artikl-dialog.component.html',
  styleUrls: ['./artikl-dialog.component.css']
})
export class ArtiklDialogComponent implements OnInit {

  public flag: number;

  constructor(public snackBar: MatSnackBar,
              public dialogRef: MatDialogRef<ArtiklDialogComponent>,
              @Inject (MAT_DIALOG_DATA) public data: Artikl,
              public artiklService: ArtiklService
              ) { }

  ngOnInit(): void {
  }

  public add() : void {
    this.artiklService.addArtikl(this.data).subscribe(() => {
      this.snackBar.open('Uspešno dodat artikl: ' + this.data.naziv, 'OK', {
        duration: 2500
      })
    }),
    (error:Error) => {
      console.log(error.name + ' ' + error.message);
      this.snackBar.open('Došlo je do greške prilikom dodavanja novog artikla.', 'Zatvori', {
        duration: 2500
      })
      
    }
  }
  public update(): void {
    this.artiklService.updateArtikl(this.data).subscribe(() => {
      this.snackBar.open('Uspešno modifikovan artikl: ' + this.data.naziv, 'OK', {
        duration: 2500
      })
    }),
    (error:Error) => {
      console.log(error.name + ' ' + error.message);
      this.snackBar.open('Došlo je do greške prilikom izmene artikla.', 'Zatvori', {
        duration: 2500
      })
      
    }
  }
  public delete(): void {
    this.artiklService.deleteArtikl(this.data.id).subscribe(() => {
      this.snackBar.open('Uspešno obrisan artikl: ' + this.data.naziv, 'OK', {
        duration: 2500
      })
    }),
    (error:Error) => {
      console.log(error.name + ' ' + error.message);
      this.snackBar.open('Došlo je do greške prilikom brisanja artikla.', 'Zatvori', {
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

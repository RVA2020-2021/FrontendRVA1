import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { Dobavljac } from 'src/app/models/dobavljac';
import { Porudzbina } from 'src/app/models/porudzbina';
import { PorudzbinaService } from 'src/app/services/porudzbina.service';
import { PorudzbinaDialogComponent } from '../dialogs/porudzbina-dialog/porudzbina-dialog.component';

@Component({
  selector: 'app-porudzbina',
  templateUrl: './porudzbina.component.html',
  styleUrls: ['./porudzbina.component.css']
})
export class PorudzbinaComponent implements OnInit, OnDestroy {

  displayedColumns = ['id', 'datum', 'isporuceno', 'iznos', 'placeno', 'dobavljac', 'actions'];
  dataSource : MatTableDataSource<Porudzbina>
  subscription: Subscription;

  constructor(private porudzbinaService: PorudzbinaService,
            private dialog: MatDialog) { }
 
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    this.loadData();
  }
  loadData() {
    this.subscription = this.porudzbinaService.getAllPorudzbine().subscribe(
      data => {
        this.dataSource = new MatTableDataSource(data);
      }
    ),
    (error : Error) => {
      console.log(error.name + ' ' + error.message);
     
    }
  }

  public openDialog(flag: number, id?: number, datum?: Date, isporuceno?: Date, iznos?: number, placeno?: boolean, dobavljac?: Dobavljac): void {

    const dialogRef = this.dialog.open(PorudzbinaDialogComponent,
      {
        data: {id,datum,isporuceno, iznos,placeno,dobavljac}
      });
    dialogRef.componentInstance.flag = flag;
    dialogRef.afterClosed().subscribe(res => {
      if(res === 1){
        this.loadData();
      }
    })
  }
  selectRow(row) {
    console.log(row);
  }

}

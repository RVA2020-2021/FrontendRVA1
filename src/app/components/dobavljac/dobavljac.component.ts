import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { Dobavljac } from 'src/app/models/dobavljac';
import { DobavljacService } from 'src/app/services/dobavljac.service';
import { DobavljacDialogComponent } from '../dialogs/dobavljac-dialog/dobavljac-dialog.component';

@Component({
  selector: 'app-dobavljac',
  templateUrl: './dobavljac.component.html',
  styleUrls: ['./dobavljac.component.css']
})
export class DobavljacComponent implements OnInit, OnDestroy {

  displayedColumns = ['id', 'naziv', 'adresa', 'kontakt', 'actions'];
  dataSource: MatTableDataSource<Dobavljac>;
  subscription: Subscription;

  constructor(private dobavljacService: DobavljacService,
              private dialog: MatDialog) { }
  
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    this.loadData();
  }

  public loadData() {
    this.subscription = this.dobavljacService.getAllDobavljacs().subscribe(
      data => {
        this.dataSource = new MatTableDataSource(data);
      }

    ),
    (error: Error) => {
      console.log(error.name + ' ' + error.message);
      
    }
    
  }

  public openDialog(flag: number, id?: number, naziv?: string, adresa?: string, kontakt?: string) : void {
    const dialogRef = this.dialog.open(DobavljacDialogComponent, {data: {id,naziv,adresa, kontakt}});
    dialogRef.componentInstance.flag = flag;
    dialogRef.afterClosed().subscribe(res => {
      if(res == 1) {
        this.loadData();
      }
    })
  }

}

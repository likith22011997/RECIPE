import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EmpAddEditComponent } from './emp-add-edit/emp-add-edit.component';
import { EmployeeService } from './services/employee.service';
import { AfterViewInit, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  displayedColumns: string[] = [
    'firstName',
    'lastName',
    'email',
    'dob',
    'gender',
    'employeeID',
    'branch',
    'designation',
    'id',
    'action'];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  //dependency injected variable _dialog
  //_dialog is a service variable
  constructor(private _dialog: MatDialog, private _empService: EmployeeService) { }

  openAddEditEmpForm() {
    const dialogRef = this._dialog.open(EmpAddEditComponent);
    dialogRef.afterClosed().subscribe({
      next :(val) => {
        console.log(val,"value");
        if(val){
          this.getEmployeeList();
        }
      }
    })
    // this.getEmployeeList();
  }
  //res means response
  getEmployeeList() {
    this._empService.getEmployeeList().subscribe({
      next: (res) => {
        // let val = res
        // console.log(res,"response")
        // console.log(res);
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      // error: (err) => {
      //   console.log(err);
      // } error cud also write as below 
      error: console.log,
    })
  }
  ngOnInit() {
    this.getEmployeeList();
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  deleteEmployee(id: number) {
    this._empService.deleteEmployee(id).subscribe({
      next: (res) => {
        alert('Employee deleted !!!');
        this.getEmployeeList();
      },
      error: console.log,
    });
  }

  openEditForm(id:number,data:any){
    this._dialog.open(EmpAddEditComponent);
    
  }
}

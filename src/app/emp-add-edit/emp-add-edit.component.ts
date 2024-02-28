import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EmployeeService } from '../services/employee.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-emp-add-edit',
  templateUrl: './emp-add-edit.component.html',
  styleUrls: ['./emp-add-edit.component.css']
})
export class EmpAddEditComponent implements OnInit {
 
  designation: string[] = [
    'Attender',
    'Clerk',
    'Officer',
    'Manager',
    'Senior Manager',
    'Chief Manager',
    'Asst General manager',
    'Deputy General Manager',
  ];

  empForm: FormGroup;
  //creating services
  constructor(private _fb: FormBuilder,
    private _empservice: EmployeeService,
    private _dialogRef: MatDialogRef<EmpAddEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any
    ) {
    this.empForm = this._fb.group({
      //all names below shd be same as formcontrolname in HTML file... plz note
      firstName: '',
      lastName: '',
      email: '',
      dob: '',
      gender: '',
      employeeID: '',
      branch: '',
      designation: '',
    })
  }
  ngOnInit() :void{
    this.empForm.patchValue(this.data);
  }
  onFormSubmit() {
    if (this.empForm.valid) {
      // console.log(this.empForm.value);
      this._empservice.addEmployee(this.empForm.value).subscribe({
        next: (val: any) => {
          alert('Employee details added successfully');
          this._dialogRef.close(true);
        },
        error: (err: any) => {
          console.error(err);
        }
      })
    }
  }
}
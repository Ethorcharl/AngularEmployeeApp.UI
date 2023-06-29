import { Component, OnInit } from '@angular/core';
import { Employee } from './model/employee';
import { EmployeeService } from './service/employee.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  //title = 'AngularEmployeeApp.UI';
  public employees?: Employee[];
  public editEmployee?:Employee | null;
  public deleteEmployee?:Employee|null;

  constructor(private employeeService:EmployeeService) { }

  ngOnInit(): void {
    this.getEmployees();
  }

  //get employee
  public getEmployees():void { //without next: and error: subscribe dont work
    this.employeeService.getEmployee().subscribe(
      {
      next: (response: Employee[] )=> {
        this.employees=response;
      },
      error: (error: HttpErrorResponse)=> {
        alert(error.message);
      }
    }
    );
  }
  //add employee
  public onAddEmployee(addForm:NgForm): void {
    document.getElementById('add-employee-form')?.click(); // close modal
    this.employeeService.addEmployee(addForm.value).subscribe( //subscribe to be notified if something is returned from the server
     { next: (response: Employee)=>{
        console.log(response);
        this.getEmployees();
        addForm.reset(); // delete info in fields
      },
      error: (error:HttpErrorResponse)=>{
        alert(error.message);
        addForm.reset(); // delete info in fields
      }
    }
    );
  }

  //update employee
  public onUpdateEmployee(employee:Employee): void {
    this.employeeService.updateEmployee(employee).subscribe( //subscribe to be notified if something is returned from the server
     { next: (response: Employee)=>{
        console.log(response);
        this.getEmployees(); //reload page
      },
      error: (error:HttpErrorResponse)=>{
        alert(error.message);
      }
    }
    );
  }

    //delete employee
  public onDeleteEmployee(employeeId:number): void {
    this.employeeService.deleteEmployee(employeeId).subscribe( //subscribe to be notified if something is returned from the server
     { next: (response: void)=>{
        console.log(response);
        this.getEmployees(); //reload page
      },
      error: (error:HttpErrorResponse)=>{
        alert(error.message);
      }
    }
    );
  }

  //search employy
  public searchEmployees(key:string):void {
    console.log(key);
    const results:Employee[]=[]; //initialize empty array
    for (const employee of this.employees!) //loop
    {
      //indexOf main 
      if (employee.name.toLowerCase().indexOf(key.toLowerCase())!==-1 // -1 if it is not present
      || employee.email.toLowerCase().indexOf(key.toLowerCase())!==-1
      || employee.phone.toLowerCase().indexOf(key.toLowerCase())!==-1
      || employee.jobTitle.toLowerCase().indexOf(key.toLowerCase())!==-1)
      {
        results.push(employee);
      }
    }
    this.employees = results;
    if(results.length===0 || !key){
      this.getEmployees(); // need change it
    }
  }

  //for Modal
  public onOpenModal(employee: Employee | null, mode:string): void{
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type='button'; //change type from submit(default) to button  
    button.style.display='none';
    button.setAttribute('data-toggle','modal'); //add programmatically instead manually?
    if(mode ==='add'){
      button.setAttribute('data-target','#addEmployeeModal');
    }
    if(mode ==='edit'){
      this.editEmployee=employee;
      button.setAttribute('data-target','#updateEmployeeModal');
    }
    if(mode ==='delete'){
      this.deleteEmployee=employee;
      button.setAttribute('data-target','#deleteEmployeeModal');
    }
    container?.appendChild(button);//? now it's button exist in html?
    button.click();
  }

}

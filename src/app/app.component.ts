import { Component, OnInit } from '@angular/core';
import { Employee } from './model/employee';
import { EmployeeService } from './service/employee.service';
import { HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  //title = 'AngularEmployeeApp.UI';
  public employees?: Employee[];

  constructor(private employeeService:EmployeeService) { }

  ngOnInit(): void {
    this.getEmployees();
  }

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
      button.setAttribute('data-target','#updateEmployeeModal');
    }
    if(mode ==='delete'){
      button.setAttribute('data-target','#deleteEmployeeModal');
    }
    container?.appendChild(button);//? now it's button exist in html?
    button.click();
  }

}

import {Component} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Employee, EmployeeService} from '../../services/employee-service';
import 'rxjs/add/operator/debounceTime';

@Component({
  selector: 'employee_search',
  templateUrl: 'app/components/employee-search/employee-search.html',
  styleUrls: ['app/components/employee-search/employee-search.css']
})
export default class EmployeeSearchComponent {
	
	employeeService: EmployeeService;
	employees: Employee[] = [];	
	employee: Employee;

	selectedRow : Number;

	titleFilter: FormControl = new FormControl();
	filterCriteria: string;


	constructor(private employeeService: EmployeeService) {
		
		this.employeeService = employeeService;
		this.employees = employeeService.getEmployees();
		
		this.selectedRow = 0;
		this.employee = employeeService.getEmployeeById(1);
		
	    this.titleFilter.valueChanges
	      .debounceTime(100)
	      .subscribe(
	        value => this.filterCriteria = value,
	        error => console.error(error));
		
	}	
	
	setClickedRow(index){
        this.selectedRow = index;
    }	
	
	onLoadEmployee(employeeId: number) {
		
    	this.employee = this.employeeService.getEmployeeById(employeeId);

	}
	
	
	
}

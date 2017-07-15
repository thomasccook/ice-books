import {Component} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Employee, EmployeeService} from '../../services/employee-service';

@Component({
  selector: 'employee_detail',
  templateUrl: 'app/components/employee-detail/employee-detail.html'
})
export default class EmployeeDetailComponent {
	
  employee: Employee;

  constructor(route: ActivatedRoute, employeeService: EmployeeService) {

    let employeeId: number = parseInt(route.snapshot.params['employeeId']);
    this.employee = employeeService.getEmployeeById(employeeId);

  }
  
}
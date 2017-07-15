export class Employee {
  constructor(
    public id: number,
    public firstName: string,
    public lastName: string,
    public startDate: Date,
    public endDate: Date,
    public headshot: string
    ) {
  }
}

export class EmployeeService {
  getEmployees(): Array<Employee> {
    return employees.map(e => new Employee(e.id, e.firstName, e.lastName, e.startDate, e. endDate, e.headshot));
  }
  
  getEmployeeById(employeeId: number): Employee {
	    return employees.find(p => p.id === employeeId);
	  }  
  
}

var employees = [
	  {
	    "id": 1,
	    "firstName": "Tyla",
	    "lastName": "Randolph",
	    startDate: new Date("February 4, 2016 10:13:00"),
	    endDate: new Date("January 4, 2017 10:13:00"),
	    headshot: "headshot01.jpg"
	  },
	  {
	    "id": 2,
	    "firstName": "Carsen",
	    "lastName": "Theon",
	    startDate: new Date("March 4, 2016 10:13:00"),
	    endDate: new Date("March 4, 2017 10:13:00"),
	    headshot: "headshot05.jpg"
	  },
	  {
		 "id": 3,
		 "firstName": "Damon",
		 "lastName": "Naomi",
	     startDate: new Date("April 4, 2016 10:13:00"),
	     endDate: new Date("February 4, 2017 10:13:00"),
		    headshot: "headshot10.jpg"
	   },
	   {
		  "id": 4,
		  "firstName": "Waylon",
		  "lastName": "Dalton",
		  startDate: new Date("May 4, 2016 10:13:00"),
		  endDate: new Date("December 4, 2017 10:13:00"),
		    headshot: "headshot02.jpg"
	  },
	  {
	    "id": 5,
	    "firstName": "Justine",
	    "lastName": "Henderson",
	    startDate: new Date("June 4, 2016 10:13:00"),
	    endDate: new Date("February 4, 2017 10:13:00"),
	    headshot: "headshot06.jpg"
	  },
	  {
		 "id": 6,
		 "firstName": "Abdullah",
		 "lastName": "Lang",
		  startDate: new Date("July 4, 2016 10:13:00"),
		  endDate: new Date("November 4, 2017 10:13:00"),
		    headshot: "headshot03.jpg"
	   },
	   {
		    "id": 7,
		    "firstName": "Marcus",
		    "lastName": "Cruz",
		    startDate: new Date("August 4, 2016 10:13:00"),
		    endDate: new Date("February 4, 2017 10:13:00"),
		    headshot: "headshot07.jpg"
	   },
	  {
	    "id": 8,
	    "firstName": "Thalia",
	    "lastName": "Cobb",
	    startDate: new Date("September 4, 2016 10:13:00"),
		endDate: new Date("February 4, 2017 10:13:00"),
	    headshot: "headshot04.jpg"
	  },
	  {
		 "id": 9,
		 "firstName": "Mathias",
		 "lastName": "Little",
		 startDate: new Date("October 4, 2016 10:13:00"),
		 endDate: new Date("February 4, 2017 10:13:00"),
		    headshot: "headshot08.jpg"
	  }
];

import {Component, Directive} from '@angular/core';
import {Router} from '@angular/router';
import {ActivatedRoute} from '@angular/router';
import {ReactiveFormsModule, FormBuilder, FormGroup, FormArray, FormControl, Validators} from '@angular/forms';
import {Contractor, ContractorService} from '../../services/contractor-service';
import {ValidatorService} from '../../services/validator-service';
import {GlobalService} from '../../services/global-service';

import {DateValueAccessor} from '../../directive/date-value-accessor';

@Component({
    selector: 'contractor-edit',
    templateUrl: 'app/components/contractor-edit/contractor-edit.html',
    styleUrls: ['app/components/contractor-edit/contractor-edit.css']
})
export class ContractorEditComponent {
	
	// Dependency Injection
	global:GlobalService;
	contractorService:ContractorService;
	router: Router;

	// Incoming data
	contractor: Contractor;

	// UI
	mainGroup: FormGroup;


	  constructor(global:GlobalService, 
			  			router: Router,
			  			route: ActivatedRoute, 
			  			contractorService: ContractorService, 
			  			validatorService: ValidatorService) {
		  
		 // Dependency Injection 
		 this.contractorService = contractorService;
		 this.router = router;
		 
		// Retrieve the record 
		let contractorId: number = parseInt(route.snapshot.params['contractorId']); 
	  	if(contractorId === 0) {
	  		this.contractor = new Contractor();
	  		this.contractor.id = 0;
	  	} else {
	  		this.contractor = this.contractorService.read(contractorId);
	  	}
	  	
	  	console.log(this.contractor);

	  	// Transfer data to the UI
	  	this.mainGroup = new FormGroup({});

	  	this.mainGroup.addControl('id': new FormControl(this.contractor.id));
	    this.mainGroup.addControl('firstName': new FormControl(this.contractor.firstName, Validators.required));
	    this.mainGroup.addControl('lastName': new FormControl(this.contractor.lastName, Validators.required));
	    this.mainGroup.addControl('phone': new FormControl(this.contractor.phone, Validators.required));
	    this.mainGroup.addControl('birthday': new FormControl(this.contractor.birthday));
	    this.mainGroup.addControl('active': new FormControl(this.contractor.active));
	    this.mainGroup.addControl('ssn': new FormControl(this.contractor.ssn, validatorService.ssnValidator));
	    this.mainGroup.addControl('headshot': new FormControl(this.contractor.headshot));
	    
		var passwordsGroup = new FormGroup([], validatorService.equalValidator);
		this.mainGroup.addControl('passwordsGroup':passwordsGroup);
		passwordsGroup.addControl('password': new FormControl('',Validators.minLength(5)));
		passwordsGroup.addControl('pconfirm': new FormControl('',Validators.minLength(5)));

	    var emailList = new FormArray([]);
	    this.mainGroup.addControl('emailList': emailList);	
	    if(this.contractor.emailList && this.contractor.emailList.length>0) {
		    for (let item of this.contractor.emailList) {
		    	
				var emailGroup = new FormGroup({});
				emailGroup.addControl('id': new FormControl(item.id)));
				emailGroup.addControl('email': new FormControl(item.email));
    	
				emailList.push(emailGroup);				
		    }    	
	    }

	    
	  }
		
	  addEmail() {
	    const emailList = this.mainGroup.get('emailList') as FormArray;
	    
		var emailGroup = new FormGroup({});
		emailGroup.addControl('id': new FormControl(0));
		emailGroup.addControl('email': new FormControl(''));
	    
	    emailList.push(emailGroup);
	  }

	  removeEmail(i) {
	    const emailList = this.mainGroup.get('emailList') as FormArray;
	    emailList.removeAt(i);
	  }		  
	  
	  onSubmit() {
		  
		// UI to JSON	    
	    if(this.contractor.id === 0) {
		    this.contractorService.create(this.mainGroup.value);	    	
	    } else {
	    	// Stupid time adjustmnet
	    	if(this.mainGroup.value.birthday instanceof Date) {
	    		this.mainGroup.value.birthday.setHours(this.mainGroup.value.birthday.getHours() + 7);
	    	}
	    	this.contractorService.update(this.mainGroup.value);
	    }
	    
	    this.router.navigate(['contractorView', this.contractor.id]);	    
	  }
	  
	  onCancel() {		    
		    this.router.navigate(['contractorView', this.contractor.id]);	    
	  }	  
	  
	  onDelete() {
		  
		  var r = confirm("Are you sure you wish to delete this record?");
		  if (r == true) {
			  this.contractorService.deleet(this.contractor.id);
		  } else {
			  return false;
		  }
		  
		  this.router.navigate(['contractorSearch']);
		  
	  }
       
}
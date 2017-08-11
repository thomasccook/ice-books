import {Component, Directive} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ReactiveFormsModule } from '@angular/forms';
import {Contractor, ContractorService} from '../../services/contractor-service';

@Component({
    selector: 'contractor-view',
    templateUrl: 'app/components/contractor-view/contractor-view.html',
    styleUrls: ['app/components/contractor-view/contractor-view.css']
})
export class ContractorViewComponent {
	
	contractor: Contractor;
		  
	  constructor(route: ActivatedRoute, contractorService: ContractorService) {
		  
		let contractorId: number = parseInt(route.snapshot.params['contractorId']);  
	  	this.contractor = contractorService.read(contractorId);

	  }
	    
}    

import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {FormControl} from '@angular/forms';
import {Contractor, ContractorFilter, ContractorQueryResult, ContractorService } from '../../services/contractor-service';
import 'rxjs/add/operator/debounceTime';

import {GlobalService} from '../../services/global-service';

import {Component} from "@angular/core";
import {ModalModule} from "ng2-modal";



@Component({
  selector: 'contractor_search',
  templateUrl: 'app/components/contractor-search/contractor-search.html',
  styleUrls: ['app/components/contractor-search/contractor-search.css']
})
export  class ContractorSearchComponent {

	// Dependency Injection
	global: GlobalService;
	router: Router;
	contractorService: ContractorService;

	contractorQueryResult: ContractorQueryResult;
	contractor: Contractor;

	constructor(global:GlobalService, router: Router, contractorService: ContractorService ) {
		
		// Dependency Injection
		this.global = global;
		this.router = router;
		this.contractorService = contractorService;
		
		this.doQuery();
	}	
	
	//////////////////////
	// Viz	
	
	cellClass(index:number) {
		if(4  < index && index < this.contractorQueryResult.recordsPerPage - 2)
			return "empty_cell";
		return "";
	}	
	
	//////////////////////
	// Events
	
	doQuery() {

		this.contractor = null;

		// TODO: remove this nonsense
		var birthdayStart = this.global.contractorFilter.birthdayStart;
		var birthdayEnd = this.global.contractorFilter.birthdayEnd;
		
		this.global.contractorFilter.birthdayStart = new Date(this.global.contractorFilter.birthdayStart);
		this.global.contractorFilter.birthdayEnd = new Date(this.global.contractorFilter.birthdayEnd);
		
		this.contractorQueryResult = this.contractorService.query(this.global.contractorFilter);
		
		// TODO: remove this nonsense
		this.global.contractorFilter.birthdayStart = birthdayStart;
		this.global.contractorFilter.birthdayEnd = birthdayEnd;		
		
		if(this.global.selectedContractorId)
			this.contractor = this.contractorService.read(this.global.selectedContractorId);
		
	}		
		
	search() {
		this.global.contractorFilter.currentPage = 1;
		this.global.selectedContractorId = null;
		this.doQuery();
	}
	
	sort(fieldToSort:string, event) {
		
		event.preventDefault();		

		
		
		this.global.contractorFilter.sort = fieldToSort;	
		this.global.contractorFilter.sortOrder = this.global.contractorFilter.sortOrder * -1;
		
		this.global.contractorFilter.currentPage = 1;
		this.global.selectedContractorId = null;
		this.doQuery();
	}	

	goToPage(goto:string, event) {
		
		event.preventDefault();

		if(goto === 'first') {
			this.global.contractorFilter.currentPage = 1;			
		} else if(goto === 'prev') {
			this.global.contractorFilter.currentPage = this.global.contractorFilter.currentPage - 1;	
			if(this.global.contractorFilter.currentPage <1)
				this.global.contractorFilter.currentPage = 1;
		} else if(goto === 'next') {
			this.global.contractorFilter.currentPage = this.global.contractorFilter.currentPage + 1;
			if(this.global.contractorFilter.currentPage >= this.contractorQueryResult.totalPageCount)
				this.global.contractorFilter.currentPage = this.contractorQueryResult.totalPageCount;			
		} else if(goto === 'last') {
			this.global.contractorFilter.currentPage = this.contractorQueryResult.totalPageCount;			
		}
		
		this.global.selectedContractorId = null;
		this.doQuery();
	}
	
	showRowsPerPagePopup(rowsPerPageModal) {
		rowsPerPageModal.open();
	}	

	hideRowsPerPagePopup(rowsPerPageModal) {
		rowsPerPageModal.close();
		this.doQuery();
	}
	
	showGoToPagePopup(goToPageModal) {
		goToPageModal.open();
	}	

	hideGoToPagePopup(goToPageModal) {
		goToPageModal.close();
		this.doQuery();
	}	
	
	rowClicked(index, contractorId){
		this.global.selectedContractorId= contractorId;
	    this.contractor = this.contractorService.read(this.global.selectedContractorId);
	}

	rowClickedView(index, contractorId){
		this.global.selectedContractorId = contractorId;
	    
	    this.router.navigate(['/contractorView', this.global.selectedContractorId]);
	}	
	
	addRecord() {
		
		var newContractor = new Contractor();
		newContractor.id = 0;
		var contractorId = this.contractorService.create(newContractor);

		this.router.navigate(['/contractorEdit', contractorId);
		return false;
		

	}
	
	
}

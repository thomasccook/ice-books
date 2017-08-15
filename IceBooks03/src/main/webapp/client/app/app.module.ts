import {NgModule}      from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouterModule, Router} from '@angular/router';
import {ReactiveFormsModule} from '@angular/forms';
import {LocationStrategy, HashLocationStrategy} from '@angular/common';
import {FormsModule, FormControl, FormGroup, Validators, NG_VALIDATORS} from '@angular/forms';

// Third Party
//https://www.npmjs.com/package/ng2-modal
import {ModalModule} from "ng2-modal";
import {DateValueAccessor} from './directive/date-value-accessor';

// Main Pages
import ApplicationComponent from './components/application/application';
import NavbarComponent from "./components/navbar/navbar";
import HomeComponent from "./components/home/home";
import FooterComponent from "./components/footer/footer";

// Globals
import {GlobalService} from './services/global-service';
import {ValidatorService} from "./services/validator-service";
import {FilterPipe} from "./components/pipes/filter-pipe";

// Contractor
import {ContractorDatabase} from "./services/contractor-service";
import {ContractorService} from "./services/contractor-service";
import {ContractorSearchComponent} from './components/contractor-search/contractor-search';
import {ContractorViewComponent} from './components/contractor-view/contractor-view';
import {ContractorEditComponent} from './components/contractor-edit/contractor-edit';

// Sales
import {IceCreamService} from "./services/icecream-service";
import {SalesTableComponent} from './components/sales-table/sales-table';

// 404
import {_404Component} from "./components/404/404";


@NgModule({
    	imports:      
    	[ 
    	  BrowserModule, 
    	  FormsModule
    	  ReactiveFormsModule,
    	  ModalModule,
          RouterModule.forRoot
          			([
                        {path: '',    component: HomeComponent},
                        {path: 'contractorSearch', component: ContractorSearchComponent},
                        {path: 'contractorEdit/:contractorId', component: ContractorEditComponent},
                        {path: 'contractorView/:contractorId', component: ContractorViewComponent},
                        {path: 'salesTable', component: SalesTableComponent},
                        {path: '**', component: _404Component}
                    ])
        ],
        declarations: 
	      [ 
	        ApplicationComponent,
	        NavbarComponent,
	        HomeComponent,
	        FooterComponent,
	        
	        FilterPipe,
	        
	        SalesTableComponent,
	        
	        ContractorSearchComponent,
	        ContractorViewComponent,
	        ContractorEditComponent,
	        
	        DateValueAccessor,
	        
	       	_404Component
	        
	       ],
         providers:    
	      [
	       GlobalService,
	       ValidatorService,
	       
	       ContractorService,
	       ContractorDatabase,

	       IceCreamService,

	       {provide: LocationStrategy, useClass: HashLocationStrategy}
	      ],
         bootstrap:    
	 	  [ 
	 	    ApplicationComponent 
	 	  ]
})
export class AppModule { }
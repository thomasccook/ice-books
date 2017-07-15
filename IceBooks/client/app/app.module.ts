import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule} from '@angular/forms';
import {LocationStrategy, HashLocationStrategy} from '@angular/common';
import {_404Component} from "./components/404/404";
import ApplicationComponent from './components/application/application';
import CarouselComponent from "./components/carousel/carousel";
import EmployeeDetailComponent from "./components/employee-detail/employee-detail";
import EmployeeSearchComponent from "./components/employee-search/employee-search";
import {EmployeeService} from "./services/employee-service";
import {FilterPipe} from "./components/pipes/filter-pipe";
import FooterComponent from "./components/footer/footer";
import HomeComponent from "./components/home/home";
import NavbarComponent from "./components/navbar/navbar";
import ProductItemComponent from "./components/product-item/product-item";
import StarsComponent from "./components/stars/stars";

import {SalesTableComponent} from './components/sales-table/sales-table';
import {SalesRowComponent} from './components/sales-table/sales-row';
import {SalesLastRowComponent} from './components/sales-table/sales-lastrow';
import {OrderComponent} from './components/sales-table/order';
import {PriceQuoterComponent} from './components/sales-table/price-quoter';
import {IceCreamService} from "./services/icecream-service";

import {ProductService} from "./services/product-service";

@NgModule({
    	imports:      
    	[ 
    	  BrowserModule, 
    	  ReactiveFormsModule,
          RouterModule.forRoot
          			([
                        {path: '',                    component: HomeComponent},
                        {path: 'employeeSearch', component: EmployeeSearchComponent},
                        {path: 'employeeSearch/employeeDetail/:employeeId', component: EmployeeDetailComponent},
                        {path: 'salesTable', component: SalesTableComponent},
                        {path: '**', component: _404Component}
                    ])
        ],
        declarations: 
	      [ 
	       	_404Component
	        ApplicationComponent,
	        CarouselComponent,
	        EmployeeDetailComponent,
	        EmployeeSearchComponent,
	        FooterComponent,
	        NavbarComponent,
	        HomeComponent,
	        ProductItemComponent,
	        StarsComponent,
	        FilterPipe,
	        
	        SalesTableComponent,
	        SalesRowComponent,
	        SalesLastRowComponent,
	        OrderComponent,
	        PriceQuoterComponent,
	        
	        
	        
	       ],
         providers:    
	      [
	       EmployeeService,
	       ProductService,
	       IceCreamService,
	       {provide: LocationStrategy, useClass: HashLocationStrategy}
	      ],
         bootstrap:    
	 	  [ 
	 	    ApplicationComponent 
	 	  ]
})
export class AppModule { }
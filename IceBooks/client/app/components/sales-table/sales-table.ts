import {Component} from '@angular/core';

import {OrderComponent} from './order';
import {PriceQuoterComponent} from './price-quoter';
import {SalesRowComponent} from './sales-row';

import {Stock} from './stock';

import {IceCream, IceCreamService} from '../../services/icecream-service';

@Component({
    selector: 'sales-table',
    template: `
    <price-quoter (buy)="priceQuoteHandler($event)"></price-quoter><br>
    <br/>
    <order-processor [stock]="stock"></order-processor>
    
    <table>
    	<tr *ngFor="let item of iceCreamList; let i = index" >
    		<sales-row [subTotalId]="'row' + i" [iceCream]="item" (buy2)="calculateTotal($event)" ></sales-row>
    	</tr>
    	<tr>
    		<sales-lastrow [total]="total"></sales-lastrow>
    	</tr>
    </table>

  `
})
export class SalesTableComponent {
	
	id:string;
	
	iceCreamService: IceCreamService;
	iceCreamList: IceCream[] = [];	
	iceCream: IceCream;
	
	total:number = 0;

    stock: Stock;

	constructor(private iceCreamService: IceCreamService) {
	    this.iceCreamList = this.iceCreamService.getList();
	  }

    priceQuoteHandler(event:Stock) {
        this.stock = event;
    }
    
    calculateTotal(event:Stock) {
    	console.log("Calculcate Total");
    	
    	var grandTotal = 0;
    	
    	$(".subtotal").get().forEach(function(entry, index, array) {
    	    // Here, array.length is the total number of items
    		//console.log($(entry).val());
    		grandTotal += Number($(entry).val());
    	});
    	console.log(grandTotal);
    	
    	this.total = grandTotal;
    	
    }
    
    
}
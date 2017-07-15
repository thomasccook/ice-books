import {Component, Directive, EventEmitter, Input, Output } from '@angular/core';

import {IceCream} from '../../services/icecream-service';

@Component({
    selector: 'sales-row',
    template: `
    	<td><input type="text" [value]="iceCream.name"/></td>
    	<td><input type="text" (change)="onInputEvent($event)" /></td>
    	<td><input type="text" [value]="iceCream.price"/></td> 
    	<td><input type="text" id="{{subTotalId}}" class="subtotal" [value]="total" /></td>    
  `
})
export class SalesRowComponent implements OnChanges {
	
	@Output() buy2: EventEmitter <Stock> = new EventEmitter();
	
	@Input() iceCream:IceCream;
	
	@Input() subTotalId:string;
	
	quantity:number = 2;
	total:number = 0;

	onInputEvent({target}):void{
		
	    this.quantity=target.value;
	    this.total = this.quantity * this.iceCream.price;
	    
        let stockToBuy2: Stock = {
                stockSymbol: "ABC",
                bidPrice: 12.34
            };		
		
		
		this.buy2.emit(stockToBuy2);
	    
	}



}
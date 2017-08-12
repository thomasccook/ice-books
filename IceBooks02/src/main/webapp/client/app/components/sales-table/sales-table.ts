import {Component} from '@angular/core';
import {IceCream, IceCreamService} from '../../services/icecream-service';

@Component({
    selector: 'sales-table',
    templateUrl: 'app/components/sales-table/sales-table.html',
    styleUrls: ['app/components/sales-table/sales-table.css']
})
export class SalesTableComponent {
	
	id:string;
	
	iceCreamService: IceCreamService;
	iceCreamList: IceCream[] = [];	
	
	grandTotal:number = 0;

	constructor(private iceCreamService: IceCreamService) {
	    this.iceCreamList = this.iceCreamService.getList();
	  }
    
	onInputEvent({target}):void {

		var id = target.id.substring(8);
		var quantity = $("#quantity" + id).val();

		this.iceCreamList.forEach((item, index) => {
			if(item.id == id) {
				item.total = item.price * quantity;
			}
		});

		var grandTotal = 0;
		this.iceCreamList.forEach((item, index) => {
			grandTotal += item.total;
		});
		this.grandTotal = grandTotal;		
 
	    
	}    

    
    
}
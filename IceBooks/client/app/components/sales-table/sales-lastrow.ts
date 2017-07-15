import {Component, Input} from '@angular/core';

import {IceCream} from '../../services/icecream-service';

@Component({
    selector: 'sales-lastrow',
    template: `
    	<td><input type="text" /></td>
    	<td><input type="text" /></td>
    	<td><input type="text" /></td> 
    	<td><input type="text" [value]="total"/></td>    
  `
})
export class SalesLastRowComponent {
	
	@Input() total:number = 200;



}
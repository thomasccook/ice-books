import {Component} from '@angular/core';
import {Product, ProductService} from '../../services/product-service';

@Component({
  selector: 'auction-home-page',
  styleUrls: ['/home.css'],
  template: `
  
	 <H2>Ice-Books</H2>
  
     <H3>Dad's Ice Cream</H3>

  `
})
export default class HomeComponent {
   products: Product[] = [];

  constructor(private productService: ProductService) {
    this.products = this.productService.getProducts();
  }
}

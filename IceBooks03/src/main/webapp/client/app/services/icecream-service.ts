export class IceCream {
  constructor(
    public id: number,
    public name: string,
    public price: number,
    public quantity: number,
    public total: number
    ) {
  }
}

export class IceCreamService {
  getList(): Array<IceCream> {
    return list.map(e => new IceCream(e.id, e.name, e.price, e.quantity, e.total)));
  }
  
  getById(id: number): Employee {
	    return list
	    	.find(p => p.id === id)
	    	.map(e => new IceCream(e.id, e.name, e.price, e.quantity, e.total));
	  }  
  
}

var list = [
  	  {
  	    "id": 2,
  	    "name": "Bomb Pop",
  	    "price": 2.22,
  	    "quantity": 0
  	    "total": 0
  	  },
      {
	    "id": 4,
	    "name": "Chaco Taco",
	    "price": 2.22,
  	    "quantity": 0
  	    "total": 0
	  },
	  {
	    "id": 8,
	    "name": "Drumstick",
	    "price": 3.33,
  	    "quantity": 0
  	    "total": 0
	  },
	  {
	    "id": 10,
	    "name": "Klondike",
	    "price": 4.44,
  	    "quantity": 0
  	    "total": 0
	  },
	  {
	    "id": 12,
	    "name": "Mint Cookie Crunch",
	    "price": 4.44,
  	    "quantity": 0
  	    "total": 0
	  },	
	  {
	    "id": 14,
	    "name": "Monster Cookie Mash",
	    "price": 2.22,
  	    "quantity": 0
  	    "total": 0
	  },
	  {
	    "id": 16,
	    "name": "PB 'N Cones",
	    "price": 3.33,
  	    "quantity": 0
  	    "total": 0
	  },
	  {
	    "id": 18,
	    "name": "Rockin' Rocky Road",
	    "price": 4.44,
  	    "quantity": 0
  	    "total": 0
	  },

	  {
	    "id": 20,
	    "name": "Toffee Brownie Twist",
	    "price": 3.33,
  	    "quantity": 0
  	    "total": 0
	  },
  
];

export class IceCream {
  constructor(
    public id: number,
    public name: string,
    public price: number,
    ) {
  }
}

export class IceCreamService {
  getList(): Array<IceCream> {
    return list.map(e => new IceCream(e.id, e.name, e.price));
  }
  
  getById(id: number): Employee {
	    return list.find(p => p.id === employeeId);
	  }  
  
}

var list = [
  	  {
  	    "id": 1,
  	    "name": "Bomb Pop",
  	    "price": 2.22
  	  },
      {
	    "id": 2,
	    "name": "Chaco Taco",
	    "price": 2.22
	  },
	  {
	    "id": 3,
	    "name": "Drumstick",
	    "price": 3.33
	  },
	  {
	    "id": 4,
	    "name": "Klondike",
	    "price": 4.44
	  },
	  {
	    "id": 5,
	    "name": "Mint Cookie Crunch",
	    "price": 4.44
	  },	
	  {
	    "id": 6,
	    "name": "Monster Cookie Mash",
	    "price": 2.22
	  },
	  {
	    "id": 7,
	    "name": "PB 'N Cones",
	    "price": 3.33
	  },
	  {
	    "id": 8,
	    "name": "Rockin' Rocky Road",
	    "price": 4.44
	  },

	  {
	    "id": 9,
	    "name": "Toffee Brownie Twist",
	    "price": 3.33
	  },
  
];

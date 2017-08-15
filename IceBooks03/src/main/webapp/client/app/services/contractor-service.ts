/////////////////
// DTO's

export class Contractor {
	
	public recordNumber:number;
	
    public id: number;
    public firstName: string;
    public lastName: string;
	public phone: string;
	public birthday: date;
	public active: boolean;
    public ssn: string;
	public headshot: string;
	public password: string;
    public emailList: Email[] = [];
}

export class Email {
	public id: number;
	public email:string;
}

export class ContractorFilter {
	
	public currentPage:number = 1;
	public recordsPerPage:number = 10;
	
	public sort:string = "id";
	public sortOrder:number = 1;
	
    public id: number;
    public firstName: string;
    public lastName: string;
	public phone: string;
	public birthdayStart: date;
	public birthdayEnd: date;
	public active: string;
    public ssn: string;

	isEmpty(): boolean {
		
		if(!this.id 
				&& !this.firstName 
				&& !this.lastName 
				&& !this.phone 
				&& !this.birthday 
				&& !this.active 
				&& !this.ssn)
			return true;
		return false;
	}

}

export class ContractorQueryResult {

	public currentPage = 1;
	public recordsPerPage:number = 10;

	public totalPageCount:number;
	public totalRecordCount:number;

	var list:Array<Contractor> =  [];		

}

///////////////////////////////////
// UI interface

export class ContractorService {
		
	contractorDatabase:ContractorDatabase;
	
	constructor() {
		this.contractorDatabase = new ContractorDatabase();
	}

	
	///////////////////////////////////
	// CRUDQ
	
	create(contractor: Contractor) {
		return this.contractorDatabase.create(contractor);
	}

	read(id:number):Contractor {
		return this.contractorDatabase.read(id);
	}
	
	update(contractor: Contractor) {
		return this.contractorDatabase.update(contractor);
	}
	
	deleet(id:number) {
		return this.contractorDatabase.deleet(id);
	}
	
	query(filter:ContractorFilter):ContractorQueryResult {
		return this.contractorDatabase.query(filter);
	}
	

	
}


/////////////////////////////////////////////////////////
// This represents the database.

export class ContractorDatabase {

	public contractorNextID:number = 0;
	public nextHeadshotID:number = 10;
	
	public contractorList: Contractor[] = null;	
	
	constructor() {
		
		this.contractorList = initialList.map(e => 
				var c = new Contractor();
					c.id = e.id; 
					c.firstName = e.firstName; 
					c.lastName = e.lastName;
					c.phone = e.phone;
					c.birthday = e.birthday;
					c.active = e.active;
					c.ssn = e.ssn;
					c.headshot = e.headshot;
					c.password = e.password;
					c.emailList = e.emailList;
					
					if(this.contractorNextID < c.id)
						this.contractorNextID  = c.id + 1;
									
					return c;
			  );		
	}


	//////////////////////////////
	// CRUDQ
	
	create(contractor: Contractor) {
		contractor.id = this.contractorNextID;	
		contractor.headshot = "headshot" + this.nextHeadshotID + ".jpg";
		this.contractorList.push(contractor);
		
		this.contractorNextID = this.contractorNextID+1;
		this.nextHeadshotID = this.nextHeadshotID+1;

		return contractor.id;
	}

	read(id:number):Contractor {
		return this.contractorList.find(x => x.id === id);
	}
	
	update(contractor: Contractor) {
		
		var index = 0;
		for(var i=0; i < this.contractorList.length; i++) {
			if(this.contractorList[i].id === contractor.id) {
				index = i;
				break;				
			}
		}
		this.contractorList[index] = contractor;
	}
	
	deleet(id:number) {
		
		var index = -1;
		for(var i=0; i < this.contractorList.length; i++) {
			if(this.contractorList[i].id === id) {
				index = i;
				break;				
			}
		}
		this.contractorList.splice(index, 1);
		
		
	}
	
	query(filter:ContractorFilter):ContractorQueryResult {

		var filteredList = [];
		
		// Filter
		for(var i= 0; i < this.contractorList.length;  i++) {
			
			var c = this.contractorList[i];
			
		    if(filter.id && c.id != filter.id)
				continue;
		    if(filter.firstName && c.firstName.toLowerCase().indexOf(filter.firstName.toLowerCase()) == -1 )
				continue;
		    if(filter.lastName && c.lastName.toLowerCase().indexOf(filter.lastName.toLowerCase()) == -1 )
				continue;
		    if(filter.birthdayStart && c.birthday < filter.birthdayStart   )
				continue;
		    if(filter.birthdayEnd && filter.birthdayEnd <= c.birthday   )
				continue;
		    if(filter.active &&  c.active !== filter.active )
				continue;
		    if(filter.ssn &&  c.ssn !== filter.ssn )
				continue;
		    
		    filteredList.push(c);
		}
		
		// Sort
		filteredList.sort(dynamicSort(filter.sort, filter.sortOrder));
		for(var i= 0; i < filteredList.length;  i++) {
			filteredList[i].recordNumber = i+1;
		}
		
		// Page
		//debugger;
		var page = [];
		var start = (filter.currentPage - 1) * filter.recordsPerPage;
		var end = start + Number(filter.recordsPerPage);
		var index = 0;
		for(var i= start; i < end;  i++) {
			if(i >= filteredList.length)
				page.push(new Contractor());
			else
				page.push(filteredList[i]);				
		}
		
		// Return
		var cqr  = new ContractorQueryResult();
		cqr.currentPage = filter.currentPage;
		cqr.recordsPerPage = filter.recordsPerPage;
		cqr.totalPageCount = Math.ceil(filteredList.length / filter.recordsPerPage);
		cqr.totalRecordCount = filteredList.length;	
		cqr.list = page;
		return cqr;		
		
	}

	function dynamicSort(property, sortOrder) {
	    if(property[0] === "-") {
	        sortOrder = -1;
	        property = property.substr(1);
	    }
	    return function (a,b) {
	        var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
	        return result * sortOrder;
	    }
	}	

	
}


//////////////////////////////////
// Fake data


var initialList = [
{
	id: 3,
	firstName: "Boyce",
	lastName: "Luna",
	phone: "340-500-7738",
	birthday: new Date("12/01/2000"),
	active: "true",
	ssn: "640-51-9756",
	headshot: "headshot00.jpg",
	password: "ywnVKLJNEldM",
	emailList: [
		]
	,
	},
	{
	id: 8,
	firstName: "Josef",
	lastName: "Baker",
	phone: "270-457-3907",
	birthday: new Date("12/10/1990"),
	active: "true",
	ssn: "398-80-6854",
	headshot: "headshot01.jpg",
	password: "cGFeyAZp0QQ3",
	emailList: [
		]
	,
	},
	{
	id: 13,
	firstName: "Javier",
	lastName: "Chase",
	phone: "499-390-9761",
	birthday: new Date("5/30/1986"),
	active: "true",
	ssn: "964-32-1325",
	headshot: "headshot02.jpg",
	password: "Hgk3CmefT2uJ",
	emailList: [
			{
				id:2,
				email:"npVTxJehVd7kGSgGdm7P7u@hushmail.com",
			},
			{
				id:5,
				email:"5qaa@outlook.com",
			},
			{
				id:9,
				email:"UUcew5KPAUfIFARuO@hushmail.com",
			},
			{
				id:10,
				email:"00K9tZvKLWG1cstcC@hushmail.com",
			},
		]
	,
	},
	{
	id: 14,
	firstName: "Bobbie",
	lastName: "Baker",
	phone: "699-600-8994",
	birthday: new Date("2/1/1994"),
	active: "true",
	ssn: "779-75-6999",
	headshot: "headshot03.jpg",
	password: "6Fb9t2Cqaxls",
	emailList: [
			{
				id:14,
				email:"5ixQJ93lb8k@hotmail.com",
			},
			{
				id:16,
				email:"eWhhW2ZOka@hushmail.com",
			},
		]
	,
	},
	{
	id: 15,
	firstName: "Elvin",
	lastName: "Mcfarland",
	phone: "887-463-3539",
	birthday: new Date("2/10/1962"),
	active: "true",
	ssn: "811-85-4712",
	headshot: "headshot04.jpg",
	password: "1xvIjgDS1y74",
	emailList: [
			{
				id:20,
				email:"ksVvRyXV@yahoo.com",
			},
		]
	,
	},
	{
	id: 18,
	firstName: "Javier",
	lastName: "Curry",
	phone: "757-208-7433",
	birthday: new Date("1/2/1969"),
	active: "true",
	ssn: "808-71-1043",
	headshot: "headshot05.jpg",
	password: "T0oF4X6lkn0I",
	emailList: [
			{
				id:25,
				email:"Z5thsssiBZS5ZBcxvkShj@zoho.com",
			},
			{
				id:28,
				email:"adZ9ggSRSA5pVJGbLG5@zoho.com",
			},
			{
				id:33,
				email:"FKJvsBv3x@hotmail.com",
			},
			{
				id:37,
				email:"t4BbgEpzwY4Kv6Bwg@gmail.com",
			},
		]
	,
	},
	{
	id: 23,
	firstName: "Neal",
	lastName: "Lynch",
	phone: "893-366-3614",
	birthday: new Date("9/11/1983 GMT-0700"),
	active: "true",
	ssn: "457-81-9994",
	headshot: "headshot06.jpg",
	password: "RfAipobio7us",
	emailList: [
		]
	,
	},
	{
	id: 27,
	firstName: "Edwin",
	lastName: "Jacobs",
	phone: "481-426-3599",
	birthday: new Date("1/2/1972"),
	active: "true",
	ssn: "364-18-1732",
	headshot: "headshot07.jpg",
	password: "ErlWounIJ43C",
	emailList: [
		]
	,
	},
	{
	id: 31,
	firstName: "Theron",
	lastName: "Ellison",
	phone: "232-716-9376",
	birthday: new Date("2/29/1960"),
	active: "true",
	ssn: "708-51-8864",
	headshot: "headshot08.jpg",
	password: "I12koV0uHcRy",
	emailList: [
			{
				id:39,
				email:"gFJbSN@hushmail.com",
			},
			{
				id:40,
				email:"twYCMbNuxH3wd@gmail.com",
			},
			{
				id:44,
				email:"8EZ9@fastmail.com",
			},
		]
	,
	},
	{
	id: 34,
	firstName: "Adam",
	lastName: "Zamora",
	phone: "631-689-0017",
	birthday: new Date("12/14/1991"),
	active: "true",
	ssn: "862-83-5775",
	headshot: "headshot09.jpg",
	password: "yqxhLeCx7JEU",
	emailList: [
			{
				id:47,
				email:"PmMpLmTTNYAOl@hotmail.com",
			},
		]
	,
	},
	{
	id: 35,
	firstName: "Rey",
	lastName: "Moss",
	phone: "227-671-7987",
	birthday: new Date("9/8/1961"),
	active: "true",
	ssn: "326-05-2052",
	headshot: "headshot10.jpg",
	password: "YKyufIEONkTE",
	emailList: [
		]
	,
	},
	{
	id: 37,
	firstName: "Shayne",
	lastName: "Cohen",
	phone: "391-724-9347",
	birthday: new Date("8/3/1982"),
	active: "true",
	ssn: "176-94-0791",
	headshot: "headshot11.jpg",
	password: "Xg4mjf8ejyzg",
	emailList: [
			{
				id:50,
				email:"2qZpTsxECBGlkR@outlook.com",
			},
			{
				id:54,
				email:"oIrg@hotmail.com",
			},
		]
	,
	},
	{
	id: 40,
	firstName: "Rey",
	lastName: "Becker",
	phone: "770-596-1632",
	birthday: new Date("7/24/1980"),
	active: "true",
	ssn: "216-47-9294",
	headshot: "headshot12.jpg",
	password: "H6jpj34gaAJs",
	emailList: [
			{
				id:59,
				email:"GF6xLumBc0gSo@gmail.com",
			},
			{
				id:64,
				email:"5V4pLKU@hotmail.com",
			},
			{
				id:69,
				email:"TBwE9y@hotmail.com",
			},
		]
	,
	},
	{
	id: 44,
	firstName: "Josef",
	lastName: "Espinoza",
	phone: "904-678-0746",
	birthday: new Date("12/9/1984"),
	active: "true",
	ssn: "677-23-4046",
	headshot: "headshot13.jpg",
	password: "WxDudJTifjv8",
	emailList: [
			{
				id:70,
				email:"i2WTRthh1QqwLd@hushmail.com",
			},
			{
				id:73,
				email:"6PIOh2qmGz9v@zoho.com",
			},
		]
	,
	},
	{
	id: 47,
	firstName: "Isidro",
	lastName: "Stewart",
	phone: "686-007-7753",
	birthday: new Date("4/8/1979"),
	active: "true",
	ssn: "194-36-6832",
	headshot: "headshot14.jpg",
	password: "3lPwEpR6E9c8",
	emailList: [
		]
	,
	},
	{
	id: 49,
	firstName: "Thurman",
	lastName: "Moss",
	phone: "605-372-0899",
	birthday: new Date("4/2/1970"),
	active: "false",
	ssn: "478-09-0319",
	headshot: "headshot15.jpg",
	password: "uGce3JFjCFNC",
	emailList: [
		]
	,
	},
	{
	id: 54,
	firstName: "Garland",
	lastName: "Espinoza",
	phone: "379-901-4720",
	birthday: new Date("11/2/1974"),
	active: "true",
	ssn: "298-30-6309",
	headshot: "headshot16.jpg",
	password: "sbKzaUjfX6Qj",
	emailList: [
			{
				id:77,
				email:"O0Ud3AJ3Qz@fastmail.com",
			},
			{
				id:79,
				email:"m0H@hotmail.com",
			},
			{
				id:80,
				email:"QMlMD@gmail.com",
			},
		]
	,
	},
	{
	id: 56,
	firstName: "Tory",
	lastName: "Wilson",
	phone: "749-586-3926",
	birthday: new Date("12/27/1987"),
	active: "true",
	ssn: "072-52-8354",
	headshot: "headshot17.jpg",
	password: "h6fBVhjzJqI0",
	emailList: [
			{
				id:83,
				email:"tweHI@outlook.com",
			},
			{
				id:86,
				email:"fjNgtXmryZNIqj@zoho.com",
			},
			{
				id:91,
				email:"745ra3@hotmail.com",
			},
			{
				id:93,
				email:"3fbkgJQfET0DP4PPMexNy@gmail.com",
			},
		]
	,
	},
	{
	id: 57,
	firstName: "Theron",
	lastName: "Jacobs",
	phone: "461-418-4019",
	birthday: new Date("12/19/1971"),
	active: "true",
	ssn: "400-02-8223",
	headshot: "headshot18.jpg",
	password: "hl2b0GAgjyUI",
	emailList: [
			{
				id:95,
				email:"UoG4qi6JlvjqvqNXe7HRz@outlook.com",
			},
			{
				id:96,
				email:"g3BDAVlV@outlook.com",
			},
			{
				id:101,
				email:"GbetLaWXi6S2c6koN@yahoo.com",
			},
		]
	,
	},
	{
	id: 58,
	firstName: "Xavier",
	lastName: "Moss",
	phone: "861-578-8897",
	birthday: new Date("6/23/1968"),
	active: "false",
	ssn: "997-83-7989",
	headshot: "headshot19.jpg",
	password: "1QaAttIJLro1",
	emailList: [
			{
				id:105,
				email:"8wT0Xk7gORcYW9@hushmail.com",
			},
		]
	,
	},
	{
	id: 63,
	firstName: "Theron",
	lastName: "Sullivan",
	phone: "039-948-5352",
	birthday: new Date("3/10/1975"),
	active: "true",
	ssn: "497-22-7929",
	headshot: "headshot20.jpg",
	password: "yd2Lso1bSpAv",
	emailList: [
			{
				id:109,
				email:"hUR@gmail.com",
			},
		]
	,
	},
	{
	id: 65,
	firstName: "Chris",
	lastName: "Stewart",
	phone: "622-038-1439",
	birthday: new Date("5/14/1966"),
	active: "true",
	ssn: "249-98-2047",
	headshot: "headshot21.jpg",
	password: "AGP0L9kCewsG",
	emailList: [
			{
				id:111,
				email:"CYVvEwOXcSa0dVj7M@mail.com",
			},
		]
	,
	},
	{
	id: 66,
	firstName: "Thurman",
	lastName: "Larson",
	phone: "416-387-4214",
	birthday: new Date("1/2/1985"),
	active: "true",
	ssn: "992-95-0060",
	headshot: "headshot22.jpg",
	password: "yqk0vQvywa1h",
	emailList: [
			{
				id:113,
				email:"QFXQpk06YI3tckP@zoho.com",
			},
		]
	,
	},
	{
	id: 68,
	firstName: "Edwin",
	lastName: "Yoder",
	phone: "833-602-5410",
	birthday: new Date("4/21/1976"),
	active: "true",
	ssn: "620-22-9348",
	headshot: "headshot23.jpg",
	password: "pHkiJhrzhTVz",
	emailList: [
			{
				id:115,
				email:"TwWMY50kOZxX@yahoo.com",
			},
			{
				id:117,
				email:"VqrY3hfn@yahoo.com",
			},
			{
				id:118,
				email:"HnsQxQsJpS3C@hushmail.com",
			},
			{
				id:123,
				email:"Hh0z6kz2CMXS4huTarUk@hushmail.com",
			},
		]
	,
	},
	{
	id: 70,
	firstName: "Adam",
	lastName: "Waters",
	phone: "951-695-4104",
	birthday: new Date("8/5/1978"),
	active: "false",
	ssn: "233-19-1577",
	headshot: "headshot24.jpg",
	password: "Jmt1vb2Nmhto",
	emailList: [
			{
				id:126,
				email:"qRI3@fastmail.com",
			},
		]
	,
	},
	{
	id: 71,
	firstName: "Josef",
	lastName: "Mullins",
	phone: "958-492-6084",
	birthday: new Date("11/10/1983"),
	active: "false",
	ssn: "184-90-1880",
	headshot: "headshot25.jpg",
	password: "k2bdH0s31dDh",
	emailList: [
			{
				id:128,
				email:"n3iSHitFk7BV91T1JemZSl@hushmail.com",
			},
			{
				id:129,
				email:"UMzZZ5@gmail.com",
			},
		]
	,
	},
	{
	id: 72,
	firstName: "Emerson",
	lastName: "Baker",
	phone: "227-751-1716",
	birthday: new Date("8/16/1979"),
	active: "false",
	ssn: "222-61-6579",
	headshot: "headshot26.jpg",
	password: "DNEujKijTqeM",
	emailList: [
		]
	,
	},
	{
	id: 73,
	firstName: "Merrill",
	lastName: "Larson",
	phone: "856-785-3168",
	birthday: new Date("5/1/1977"),
	active: "true",
	ssn: "638-41-1198",
	headshot: "headshot27.jpg",
	password: "sNvQ1xv9zos5",
	emailList: [
		]
	,
	},
	{
	id: 76,
	firstName: "Kory",
	lastName: "Lawson",
	phone: "296-418-3409",
	birthday: new Date("1/15/1994"),
	active: "true",
	ssn: "399-00-5821",
	headshot: "headshot28.jpg",
	password: "rllUUTWYYcgQ",
	emailList: [
			{
				id:134,
				email:"RqGUyXu@fastmail.com",
			},
			{
				id:138,
				email:"wJZ06deCZeo@fastmail.com",
			},
			{
				id:139,
				email:"LT9sfA1@gmail.com",
			},
			{
				id:142,
				email:"D9ZEVFgJlcY4@zoho.com",
			},
		]
	,
	},
	{
	id: 80,
	firstName: "Noe",
	lastName: "Lawson",
	phone: "464-915-1957",
	birthday: new Date("12/7/1993"),
	active: "false",
	ssn: "768-76-1100",
	headshot: "headshot29.jpg",
	password: "S6lXztblUYE8",
	emailList: [
		]
	,
	},
	{
	id: 84,
	firstName: "Clyde",
	lastName: "Curry",
	phone: "578-198-4665",
	birthday: new Date("6/15/1977"),
	active: "false",
	ssn: "520-65-2011",
	headshot: "headshot30.jpg",
	password: "obblq67F3RaZ",
	emailList: [
			{
				id:143,
				email:"iUrbt5@zoho.com",
			},
			{
				id:148,
				email:"YilzMBeYJnKOHfz0p7H@zoho.com",
			},
			{
				id:150,
				email:"NidcMov4ldDRWA@outlook.com",
			},
		]
	,
	},
	{
	id: 85,
	firstName: "Bradford",
	lastName: "Key",
	phone: "227-020-5619",
	birthday: new Date("1/28/1976"),
	active: "true",
	ssn: "346-17-3111",
	headshot: "headshot31.jpg",
	password: "qD8vUd7vLX3b",
	emailList: [
			{
				id:155,
				email:"rZ6BcdD@hushmail.com",
			},
			{
				id:157,
				email:"HvipN06kL58cRxv2xeVJA@yahoo.com",
			},
			{
				id:161,
				email:"TE4Bcnp7qIplJvx@yahoo.com",
			},
			{
				id:166,
				email:"hTYhpeR@hotmail.com",
			},
		]
	,
	},
	{
	id: 86,
	firstName: "Tory",
	lastName: "Snyder",
	phone: "182-002-1382",
	birthday: new Date("9/23/1974"),
	active: "true",
	ssn: "025-15-2232",
	headshot: "headshot32.jpg",
	password: "LYqC5lNUXxJf",
	emailList: [
			{
				id:170,
				email:"xs7LKYY9M5pqUSl@mail.com",
			},
			{
				id:171,
				email:"Hxu@hushmail.com",
			},
			{
				id:174,
				email:"URf8XnaW@fastmail.com",
			},
			{
				id:175,
				email:"VExb8ld7FdFmEDu75wUT@yahoo.com",
			},
		]
	,
	},
	{
	id: 88,
	firstName: "Thomas",
	lastName: "Barajas",
	phone: "876-417-1274",
	birthday: new Date("11/23/1970"),
	active: "true",
	ssn: "867-05-4707",
	headshot: "headshot33.jpg",
	password: "SG2QPoyIfvOq",
	emailList: [
		]
	,
	},
	{
	id: 93,
	firstName: "Merrill",
	lastName: "Becker",
	phone: "910-456-0015",
	birthday: new Date("9/29/1962"),
	active: "false",
	ssn: "696-30-7652",
	headshot: "headshot34.jpg",
	password: "u3o7zEF31zWu",
	emailList: [
		]
	,
	},
	{
	id: 98,
	firstName: "Thomas",
	lastName: "Baker",
	phone: "456-046-6917",
	birthday: new Date("7/8/1970"),
	active: "true",
	ssn: "747-26-3858",
	headshot: "headshot35.jpg",
	password: "MyL37CdWdTw6",
	emailList: [
		]
	,
	},
	{
	id: 101,
	firstName: "Javier",
	lastName: "Jacobs",
	phone: "691-900-2598",
	birthday: new Date("12/4/1966"),
	active: "true",
	ssn: "031-42-0978",
	headshot: "headshot36.jpg",
	password: "Uji2B3WJ2wNd",
	emailList: [
			{
				id:179,
				email:"niFrUnT@zoho.com",
			},
			{
				id:180,
				email:"w5ZeBObgg4I7cNRUvE@hotmail.com",
			},
			{
				id:185,
				email:"qNSm@gmail.com",
			},
		]
	,
	},
	{
	id: 102,
	firstName: "Josef",
	lastName: "Barrera",
	phone: "696-040-1294",
	birthday: new Date("10/24/1976"),
	active: "true",
	ssn: "458-18-3583",
	headshot: "headshot37.jpg",
	password: "bRbGn8StR3Oy",
	emailList: [
			{
				id:187,
				email:"AmvPK@hushmail.com",
			},
		]
	,
	},
	{
	id: 107,
	firstName: "Elvin",
	lastName: "Sullivan",
	phone: "054-591-8535",
	birthday: new Date("11/21/1986"),
	active: "true",
	ssn: "699-81-3270",
	headshot: "headshot38.jpg",
	password: "VnHfWhD5UAow",
	emailList: [
			{
				id:190,
				email:"PeQHURy@mail.com",
			},
			{
				id:195,
				email:"EsZDlB9fxyZ@mail.com",
			},
			{
				id:197,
				email:"tSzOkKpZx4v6CBmp4yE@outlook.com",
			},
			{
				id:198,
				email:"UtCOnV6vKGU@hotmail.com",
			},
		]
	,
	},
	{
	id: 108,
	firstName: "Hubert",
	lastName: "Mora",
	phone: "214-300-6951",
	birthday: new Date("6/8/1994"),
	active: "true",
	ssn: "968-49-4700",
	headshot: "headshot39.jpg",
	password: "Uhemc4nHL4ol",
	emailList: [
		]
	,
	},
	{
	id: 109,
	firstName: "Albert",
	lastName: "Downs",
	phone: "430-516-3569",
	birthday: new Date("3/9/1994"),
	active: "true",
	ssn: "082-30-2342",
	headshot: "headshot40.jpg",
	password: "YpAxsRtppRDl",
	emailList: [
			{
				id:202,
				email:"gBBgv5rLinj7q0hwIhG@outlook.com",
			},
		]
	,
	},
	{
	id: 113,
	firstName: "Boyce",
	lastName: "Dorsey",
	phone: "510-152-6996",
	birthday: new Date("6/28/1979"),
	active: "true",
	ssn: "978-37-3500",
	headshot: "headshot41.jpg",
	password: "i0xgVfHGUE16",
	emailList: [
			{
				id:207,
				email:"IKJDCaW@yahoo.com",
			},
		]
	,
	},
	{
	id: 116,
	firstName: "Emile",
	lastName: "Barrera",
	phone: "173-378-6255",
	birthday: new Date("2/19/1974"),
	active: "true",
	ssn: "993-60-2433",
	headshot: "headshot42.jpg",
	password: "pqSsgGibrlE3",
	emailList: [
			{
				id:211,
				email:"MAroe@yahoo.com",
			},
			{
				id:215,
				email:"cNC9d1Y@fastmail.com",
			},
			{
				id:217,
				email:"rKMqJFbKwF0M2MEk9Hf@zoho.com",
			},
			{
				id:220,
				email:"CzCzxzj@gmail.com",
			},
		]
	,
	},
	{
	id: 118,
	firstName: "Chris",
	lastName: "Carson",
	phone: "820-431-1107",
	birthday: new Date("5/26/1981"),
	active: "true",
	ssn: "781-46-7521",
	headshot: "headshot43.jpg",
	password: "fElCs41Df8e1",
	emailList: [
			{
				id:222,
				email:"a2OhD5MZhZ1ME1K0GaDAx@yahoo.com",
			},
			{
				id:223,
				email:"qNlv54Xua@hotmail.com",
			},
			{
				id:226,
				email:"FVUCedPUYjRF4Tw6TuYBAG@outlook.com",
			},
		]
	,
	},
	{
	id: 123,
	firstName: "Merrill",
	lastName: "Snyder",
	phone: "323-619-9072",
	birthday: new Date("9/13/1977"),
	active: "true",
	ssn: "581-63-5589",
	headshot: "headshot44.jpg",
	password: "ONUdPbF90P5d",
	emailList: [
			{
				id:229,
				email:"z2D0U@outlook.com",
			},
		]
	,
	},
	{
	id: 127,
	firstName: "Noble",
	lastName: "Wilkerson",
	phone: "031-127-0605",
	birthday: new Date("1/28/1982"),
	active: "true",
	ssn: "079-46-9146",
	headshot: "headshot45.jpg",
	password: "5kDw2thR3yhY",
	emailList: [
			{
				id:232,
				email:"qrWYPmznA67fx1@zoho.com",
			},
			{
				id:236,
				email:"PrQzN2cg@gmail.com",
			},
			{
				id:241,
				email:"mkodlf@outlook.com",
			},
		]
	,
	},
	{
	id: 130,
	firstName: "Isidro",
	lastName: "Mullins",
	phone: "212-659-2148",
	birthday: new Date("8/16/1994"),
	active: "true",
	ssn: "196-71-2682",
	headshot: "headshot46.jpg",
	password: "L2dZzmfPYoqB",
	emailList: [
		]
	,
	},
	{
	id: 135,
	firstName: "Isidro",
	lastName: "Ellison",
	phone: "134-193-8812",
	birthday: new Date("4/2/1974"),
	active: "true",
	ssn: "405-12-4251",
	headshot: "headshot47.jpg",
	password: "clfzv3OUPZuN",
	emailList: [
			{
				id:246,
				email:"6glX2yc8Y9MbSzU4H@outlook.com",
			},
			{
				id:248,
				email:"vwAChYaUnAvfb8o@fastmail.com",
			},
			{
				id:249,
				email:"3CkuBnTf6DTP@gmail.com",
			},
		]
	,
	},
	{
	id: 138,
	firstName: "Hank",
	lastName: "Carson",
	phone: "421-497-9867",
	birthday: new Date("10/7/1984"),
	active: "false",
	ssn: "118-29-4648",
	headshot: "headshot48.jpg",
	password: "dZJSiV1X4GxC",
	emailList: [
			{
				id:251,
				email:"H4sTwqmS1muVufwfUcI2xz@yahoo.com",
			},
			{
				id:253,
				email:"nQfltCPIozS90B4YHhFQKK@outlook.com",
			},
		]
	,
	},
	{
	id: 143,
	firstName: "Garland",
	lastName: "Gates",
	phone: "732-909-4260",
	birthday: new Date("2/19/1979"),
	active: "true",
	ssn: "809-88-9825",
	headshot: "headshot49.jpg",
	password: "Nw6qOM58dKxi",
	emailList: [
		]
	,
	},


];

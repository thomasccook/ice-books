export class ValidatorService {
	
	// TODO: How can this be in a global function
	ssnValidator(control: FormControl): {[key: string]: any} {
		  const value: string = control.value || '';
		  const valid = value.match(/(^\d{3}-?\d{2}-?\d{4}$|^XXX-XX-XXXX$)/);
		  return valid ? null : {ssn: true};
	}

	equalValidator({value}: FormGroup): {[key: string]: any} {
		  const [first, ...rest] = Object.keys(value || {});
		  const valid = rest.every(v => value[v] === value[first]);
		  return valid ? null : {equal: true};
	}	

  
}


export const updateObject = (oldObject, updatedProperties) => {
	return {
		...oldObject,
		...updatedProperties,
	};
};

export const checkValidity = (value, rules) => {
	//to prevent a common validation mistake we initialy set our result to true and then check for the consecutive rules making sure that we take our previous results into consideration.
	//Sounds confusing but it comes down to checking whether the previous result was also true
	//by putting && between current and previous result we can cascade a 'false' result down the if statements
	let isValid = true;

	if (rules.required) {
		isValid = value.trim() !== '' && isValid;
	}
	if (rules.minLength) {
		isValid = value.length >= rules.minLength && isValid;
	}
	if (rules.maxLength) {
		isValid = value.length <= rules.maxLength && isValid;
	}

	return isValid;
};

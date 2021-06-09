const drawEmails = (list, num) => {
	
	const result = [];

	const clone = [...list];

	const drawRaffle = (emails) => {
		const index = 
	 		Math.floor(Math.random() * emails.length);
		return {
			email: emails[index],
			index
		};
	}

	while (num > 0) {
		const { email: winner, index} = drawRaffle(clone);
		result.push(winner);
		num --;
		clone.splice(index);
	}

	return result;
}

module.exports = drawEmails;
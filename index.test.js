const draw = require('./index');

describe('raffle function', () => {
	const list = [
		'email1',
		'email2',
		'email3',
		'email4',
		'email5',
		'email6',
		'email7',
		'email8',
		'email9',
		'email10'
	];

	test('produces correct number of results', () => {
		expect(draw(list,1).length).toBe(1);
		expect(draw(list,5).length).toBe(5);
		expect(draw(list,10).length).toBe(10);
	});

	test('no duplicates', () => {
		const result = draw(list, 5);
		const setOfUniques = new Set(result);
		expect(result.length).toBe(setOfUniques.size); 
	});
})

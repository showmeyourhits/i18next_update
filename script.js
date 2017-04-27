async function foo () {
	return await new Promise(resolve => {
		setTimeout(function() {
			resolve('reassemble');
		}, 2000);
	});
};


console.log(foo());

foo().then(console.log)
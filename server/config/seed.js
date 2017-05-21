exports = module.exports = (seedUser) => {
	console.log('running migrations');
	let User        = require('../api/user/user.model').User;
	let userSeed    = require('../api/user/user.seed.json');

	// const Category     = require('../api/category/category.model').Category;
	// const categorySeed = require('../api/category/category.seed.json');

	if(seedUser) {
		console.log('Seeding Users');
		User.find({}).remove(function () {
			User.create(userSeed).catch((e) => {
				console.log(e);
			});
		});
	}

	// Category.find({}).remove(function () {
	// 	Category.create(categorySeed).catch((e) => {
	// 		console.log(e);
	// 	});
	// });
};

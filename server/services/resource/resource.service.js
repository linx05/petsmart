const aqp = require('api-query-params');

function add(model, data) {
	return model.create(data);
}

function edit(model, id, data) {
	return find(model, id)
		.then((entity) => {
			entity = Object.assign(entity, data);
			return callbackToPromise(entity.save);
		})
		.catch((error) => {
			return new Promise((resolve, reject) => reject(error));
		});
}

function find(model, id, populate) {
	let builder = model.findById(id);
	builder = populate ? builder.populate(populate) : builder;

	return builder
		.exec()
		.then((data) => {
			return new Promise((resolve, reject) => {
				if (!data) reject('Not Found');
				resolve(data);
			});
		})
		.catch((error) => {
			return new Promise((resolve, reject) => {
				reject(error);
			});
		});
}

function get(model, params, populate) {
	const query = aqp.default(params);
	const orCondition = handleOrCondition(query);

	let builder = model.find(query.filter);
	builder = populate ? builder.populate(populate) : builder;

	return builder
		.skip(query.skip)
		.limit(query.limit)
		.sort(query.sort)
		.lean()
		.exec();
}

function remove(model, id) {
	return find(model, id)
		.then((entity) => {
			return entity.remove();
		})
		.catch((error) => {
			return new Promise((resolve, reject) => reject(error));
		});
}

function search(model, params, populate) {
	const query = aqp.default(params);
	const orCondition = handleOrCondition(query);

	let builder = model.find(query.filter);
	builder = populate ? builder.populate(populate) : builder;

	return builder
		.sort(query.sort)
		.lean()
		.exec()
		.then((data) => {
			return new Promise((resolve, reject) => {
				if (!data) reject('Not Found');

				const result = filterByOrCondition(data, orCondition);

				if (query.skip >= 0 && query.limit >= 0) {
					resolve(result.slice(query.skip, query.skip + query.limit));
				} else {
					resolve(result);
				}

			});
		})
		.catch((error) => {
			return new Promise((resolve, reject) => {
				reject(error);
			});
		});
}

function callbackToPromise(callback) {
	return new Promise((resolve, reject) => {
		return callback((error, data) => {
			if (error) reject(error);
			resolve(data);
		});
	});
}

function filterByOrCondition(collection, conditions) {
	if (!conditions) return collection;

	return collection.filter((element) => {
		let match = false;

		for (const condition of conditions) {
			const conditionValue = Object.values(condition)[0];
			const elementValue = _.get(element, Object.keys(condition)[0]);

			if (_.isRegExp(conditionValue) && !_.isUndefined(elementValue)) {
				match = conditionValue.test(elementValue);
			}
			else if (!_.isUndefined(elementValue)) {
				match = elementValue.includes(conditionValue);
			}

			if (match) break;
		}

		return match;
	});
}

function handleOrCondition(query) {
	let orCondition = query.filter.$or;

	if (query.filter.$or) {
		orCondition = evalOrLikeFlag(orCondition);
		delete query.filter.$or;
		return orCondition;
	}

	function evalOrLikeFlag(condition) {
		const orLike = condition.filter(element => element.orLike === true);

		return orLike.length > 0 ? convertValuesToRegex(condition) : condition;
	}

	function convertValuesToRegex(collection) {
		return collection
			.filter(element => Object.keys(element)[0] !== 'orLike')
			.map((element) => {
				const key = Object.keys(element)[0];
				const value = Object.values(element)[0];
				return { [key]: new RegExp(_.escapeRegExp(value), 'i') };
			});
	}
}

module.exports = {
	add,
	edit,
	find,
	get,
	remove,
	search,
};

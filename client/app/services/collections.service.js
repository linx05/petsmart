export default class CollectionsService {
	constructor () {

	}

	contains (item, matching, ...keys) {
		return !!(_.find(matching, matchingItem => {
			return _.reduce(keys, (val, key) => {
				return val || item[key] === matchingItem[key];
			}, false);
		}))
	}

	includes (element, query, key) {
		const item = _.get(element, key, '').toString();
		return item.toLowerCase().includes(query.toLowerCase());
	}

	getCommonSorted (collection, matching, sortKey, key) {
		const common = getCommon(collection, matching, key);
		return {
			original : _.sortBy(common, sortKey),
			modified : _.sortBy(matching, sortKey)
		}
	}

	getCommon (collection, matching, ...keys) {
		return _.filter(collection, collectionItem => this.contains(collectionItem, matching, keys));
	}

	removeCommon (collection, matching, ...keys) {
		return _.reject(collection, collectionItem => this.contains(collectionItem, matching, keys))
	}

	search (collection, query, ...keys) {
		return _.filter(collection, element => _.reduce(keys, (val, key) => {
				return val || this.includes(element, query, key)
			}, false)
		);
	}

}

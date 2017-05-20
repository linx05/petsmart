class QueryBuilder {

	constructor() {
		this.query = '';
	}

	build() {
		// Must be implemented in the client service
	}

	getQuery() {
		const result = this.query;
		this.query = '';
		return result.length > 0 ? result.slice(0, -1) : '';
	}

	exists(key) {
		this.query += key + '&';
		return this;
	}

	in(key, values = [], operator = '=') {
		this.query += key + operator + values.join() + '&';
		return this;
	}

	like(key, value) {
		return this.where(key, '=/', value + '/i');
	}

	limit(value = 100) {
		this.query += 'limit=' + value + '&';
		return this;
	}

	notIn(key, values = []) {
		return this.in(key, values, '!=');
	}

	orLike(collection = [{ 'key': 'value' }]) {
		collection.push({ orLike: true });
		return this.orWhere(collection);
	}

	orWhere(collection = [{ 'key': 'value' }]) {
		this.query += 'filter={"$or":' + angular.toJson(collection) + '}&';
		return this;
	}

	skip(value = 0) {
		this.query += 'skip=' + value + '&';
		return this;
	}

	sort(key, sortType = '') {
		this.query += 'sort=' + sortType + key + '&';
		return this;
	}

	where(key, operator, value) {
		this.query += key + operator + value + '&';
		return this;
	}

}

export default function QueryBuilderService() {
	return {
		getInstance() {
			return new QueryBuilder();
		}
	};
}

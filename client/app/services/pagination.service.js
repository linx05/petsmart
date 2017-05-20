export default class PaginationService {

	constructor(ResourceService) {
		'ngInject';
		this.collection      = [];
		this.pageSize        = 0;
		this.lastCollection  = [];
		this.lastPageSize    = 0;
		this.totalPages      = 0;
		this.looseness       = 2;
		this.isWaiting       = false;
		this.itemsPerRequest = ResourceService.pageSize;
	}

	nextPage() {
		return Math.trunc(this.collection.length / this.itemsPerRequest) + 1;
	}

	set(collection, pageSize) {
		this.lastCollection = this.collection;
		this.lastPageSize   = this.pageSize;
		this.collection     = collection;
		this.pageSize       = pageSize;
		this.totalPages     = Math.ceil(this.collection.length / this.pageSize);
		this.isWaiting      = false;
	}

	shouldPrepareRequest(newPage, oldPage) {
		if (this.isWaiting) return false;

		const sameCollection = this.collection.every((element, index) => {
			return element === this.lastCollection[index];
		});

		this.isWaiting = ((newPage > oldPage) &&
				(newPage + this.looseness >= this.totalPages) &&
				(this.nextPage() < this.totalPages) &&
				!sameCollection);

		return this.isWaiting;
	}

}

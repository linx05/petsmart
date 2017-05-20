const Schema         = mongoose.Schema;
const SaleItemSchema = require('./sale-item.model').SaleItemSchema;

const SaleSchema = new Schema({
	items          : [SaleItemSchema],
	iva            : {
		type: Number
	},
	subtotal       : {
		type: Number
	},
	total          : {
		type: Number
	},
	salesman       : {
		type    : Schema.ObjectId,
		ref     : 'User',
		required: true
	},
	amount_received: {
		type: Number,
	},
	change         : {
		type: Number
	},
	sales_date     : {
		type: Date,
	}
});

module.exports = {
	Sale      : mongoose.model('Sale', SaleSchema),
	SaleSchema: SaleSchema
};

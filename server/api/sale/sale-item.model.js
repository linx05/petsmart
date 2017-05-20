const Schema        = mongoose.Schema;
const ProductSchema = require('../product/product.model').ProductSchema;

const SaleItemSchema = new Schema({
	product   : ProductSchema,
	amount    : {
		type: Number
	},
	sale_price: {
		type: Number
	},
});

module.exports = {
	SaleItemSchema: SaleItemSchema
};

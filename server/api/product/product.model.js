const Schema = mongoose.Schema;

const ProductSchema = new Schema({
	name     : {
		type    : String,
		required: true,
	},
	unit     : {
		type    : String,
		required: true
	},
	price    : {
		type: Number
	},
	code     : {
		type  : String,
	},
	inventory: {
		type: Number
	},
	category : {
		type: String
	},
});

module.exports = {
	Product      : mongoose.model('Product', ProductSchema),
	ProductSchema: ProductSchema
};

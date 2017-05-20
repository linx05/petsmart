const Schema       = mongoose.Schema;

const InventoryItemSchema = new Schema({
	product : {
		type: Schema.ObjectId,
		ref : 'Product'
	},
	amount  : {
		type: Number
	},
	original: {
		type: Number
	},
	min     : {
		type: Number,
	},
	max     : {
		type: Number
	},
	changed : {
		type: Boolean
	}
});

module.exports = {
	InventoryItemSchema: InventoryItemSchema
};

const Schema              = mongoose.Schema;
const InventoryItemSchema = require('../inventory/inventory-item.model').InventoryItemSchema;
const AutoIncrement       = require('mongoose-sequence');

const MovementStates = {
	PENDING : 'pending',
	REJECTED: 'rejected',
	CANCELED: 'canceled',
	ACCEPTED: 'accepted'
};

const MovementTypes = {
	ENTRY     : 'entry',
	OUTPUT    : 'output',
	CORRECTION: 'correction'
};

const MovementSchema = new Schema({
	identifier      : Number,
	movement_date   : {
		type   : Date,
		default: Date.now
	},
	code            : {
		type: String
	},
	products        : [InventoryItemSchema],
	state           : {
		type    : String,
		required: true,
		default : 'pending',
		enum    : _.values(MovementStates)
	},
});

MovementSchema.plugin(AutoIncrement, {inc_field: 'identifier'});

module.exports = {
	Movement      : mongoose.model('Movement', MovementSchema),
	MovementSchema: MovementSchema,
	MovementStates,
	MovementTypes
};

const Schema = mongoose.Schema;

const DriverSchema = new Schema({
	name: {
		type: String,
		required: true,
	},
	vehicle: {
		type: String,
		required: true,
	},
}, {
	timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});


module.exports = {
	Driver: mongoose.model('Driver', DriverSchema),
	DriverSchema: DriverSchema
};

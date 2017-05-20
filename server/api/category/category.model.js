const Schema = mongoose.Schema;

const CategorySchema = new Schema({
	name: {
		type    : String,
		required: true
	}
});

module.exports = {
	Category      : mongoose.model('Category', CategorySchema),
	CategorySchema: CategorySchema
};

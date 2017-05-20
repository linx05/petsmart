const Schema = mongoose.Schema;

const SettingsSchema = new Schema({
	language: {
		type    : String,
		enum    : ['english', 'spanish'],
		default : 'spanish',
		required: true
	},

	notifications: {
		type: Boolean,
		default: true,
		required: true,
	},
});

module.exports = {
	SettingsSchema: SettingsSchema
};

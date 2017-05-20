const bcrypt          = require('bcryptjs');
const LocalAccount    = require('./local/local.model');
const SettingsSchema  = require('../settings/settings.model').SettingsSchema;
const uniqueValidator = require('mongoose-unique-validator');
const Schema          = mongoose.Schema;

mongoose.plugin(uniqueValidator);

const UserSchema = new Schema({
	full_name: {
		type    : String,
		required: true
	},

	email: {
		type    : String,
		unique  : true,
		required: true
	},

	level: {
		type    : String,
		required: true,
		enum    : ['admin', 'employee']
	},

	active: {
		type   : Boolean,
		default: true
	},

	local: {
		username: { type: String, unique: true },
		password: { type: String, select: false }
	},

	settings:  SettingsSchema,

	customer: {
		phone: { type: String, },
		rfc: { type: String, }
	}
}, {
	timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

UserSchema.pre('save', function (callback) {
	let user = this;

	// Break out if the password hasn't changed
	if (!user.isModified('local.password')) return callback();

	// Password changed so we need to hash it
	user.local.password = UserSchema.statics.generateHash(user.local.password);
	callback();
});

// generating a hash
UserSchema.statics.generateHash = function (password) {
	return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
UserSchema.methods.validPassword = function (password) {
	return bcrypt.compareSync(password, this.local.password);
};

module.exports = {
	User      : mongoose.model('User', UserSchema),
	UserSchema: UserSchema,
	accounts  : {
		LocalAccount: LocalAccount
	}
};

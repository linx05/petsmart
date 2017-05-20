'use strict';

const User = require('../user.model').User;
const Schema = mongoose.Schema;

const LocalAccountSchema = new Schema({
    username: {type: String, unique: true},
    password: {type: String}
});


LocalAccountSchema.statics.validateAccount = function ({username, password}) {
    return new Promise(function (resolve, reject) {
        if (!username || !password || password.length < 8)return reject();
        if (!username)return resolve();
        return User.find({
            'local': {
                $elemMatch: {
                    'field': 'username',
                    'value': username
                }
            }
        }).exec()
        .then(()=> {
            return reject('Warehouse Exists');
        })
        .catch((err) => {
            return resolve();
        })
    });

};

module.exports = mongoose.model('Local', LocalAccountSchema);



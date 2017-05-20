/**
 * Broadcast updates to client when the model changes
 */

'use strict';

// var Auth = require('./auth.model');
//
// exports.register = function (socket) {
//    Auth.schema.post('save', function (doc) {
//        onSave(socket, doc);
//    });
//    Auth.schema.post('remove', function (doc) {
//        onRemove(socket, doc);
//    });
// };

function onSave(socket, doc, cb) {
    socket.emit('auth:save', doc);
}

function onRemove(socket, doc, cb) {
    socket.emit('auth:remove', doc);
}

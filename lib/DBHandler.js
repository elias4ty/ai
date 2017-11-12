const mongoose = require('mongoose');

module.exports = function () {
    return function* (next) {
        mongoose.connect('mongodb://localhost:27017/ty');

        yield *next
    }
}



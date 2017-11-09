const mongoose = require('mongoose');

mmodule.exports = function () {
    return function* (next) {
        mongoose.connect('mongodb://localhost:27017/ty');

        this.mongo = mongoose;
        this.schema = mongoose.Schema;

        yield *next
    }
}



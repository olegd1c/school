import * as mongoose from 'mongoose';

const individualSchema = new mongoose.Schema({
    first_name: String,
    last_name: String,
    father_name: String,
    fio: String,
    address: String,
    inn: String,
    createdAt: {
        type: Date,
        default: new Date()
    },
    updatedAt: {
        type: Date,
        default: null
    },
});

individualSchema.pre('save', function (next) {
    this.fio = this.last_name + ' ' + this.first_name.substring(0, 1) + '. ' + this.father_name.substring(0, 1) + '. ';
    next();
});

individualSchema.pre('findOneAndUpdate', function () {
    const obj = this.getUpdate()['$set'];
    const fio = obj.last_name + ' ' + obj.first_name.substring(0, 1) + '. ' + obj.father_name.substring(0, 1) + '. ';
    this.findOneAndUpdate({}, { $set: { fio: fio } });
});

const Individual = mongoose.model('Individual', individualSchema);

export default Individual;

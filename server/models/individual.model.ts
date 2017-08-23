import * as mongoose from 'mongoose';

const individualSchema = new mongoose.Schema({
    first_name: String,
    last_name: String,
    father_name: String,
    address: String,
    inn: String,
    createdAt: {
        type: Number,
    },
    updatedAt: {
        type: Number,
        default: null
    },
});

const Individual = mongoose.model('Individual', individualSchema);

export default Individual;

import * as mongoose from 'mongoose';

const companySchema = new mongoose.Schema({
    name: String,
    name_full: String,
    address: String,
    createdAt: {
        type: Number,
    },
    updatedAt: {
        type: Number,
        default: null
    },
});

const Company = mongoose.model('Company', companySchema);

export default Company;

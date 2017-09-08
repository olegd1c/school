import * as mongoose from 'mongoose';

const companySchema = new mongoose.Schema({
    name: String,
    name_full: String,
    address: String,
    createdAt: {
        type: Date,
        default: new Date()
    },
    updatedAt: {
        type: Date,
        default: null
    },
});

const Company = mongoose.model('Company', companySchema);

export default Company;

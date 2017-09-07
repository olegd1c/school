import * as mongoose from 'mongoose';

const ChargeSchema = new mongoose.Schema({
    typeChargeId: {type: mongoose.Schema.Types.ObjectId, ref: 'TypeCharge'},
    count: Number
});

const recruitmentDetailsSchema = new mongoose.Schema({
    positionId: {type: mongoose.Schema.Types.ObjectId, ref: 'Position'},
    individualId: {type: mongoose.Schema.Types.ObjectId, ref: 'Individual'},    
    date_receipt: Number,
    date_dismissal: {
        type: Number,
        default: null
    },
    salary: Number,
    rate: Number,
    charges: [ChargeSchema],
    mainWork: {
        type: [
            { type: String, enum: [ 'основне', 'по сумісництву' ] }],
        default: 'основне'
        },
    typeBudgetId: {type: mongoose.Schema.Types.ObjectId, ref: 'TypeBudget'},   
});

const recruitmentSchema = new mongoose.Schema({
    number: String,
    date: Number,
    companyId: {type: mongoose.Schema.Types.ObjectId, ref: 'Company'},
    details: [recruitmentDetailsSchema],
    createdAt: {
        type: Number,
    },
    updatedAt: {
        type: Number,
        default: null
    },
});

const Recruitments = mongoose.model('Recruitments', recruitmentSchema);

export default Recruitments;

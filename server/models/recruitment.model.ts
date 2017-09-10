import * as mongoose from 'mongoose';

const ChargeSchema = new mongoose.Schema({
    typeChargeId: {type: mongoose.Schema.Types.ObjectId, ref: 'TypeCharge'},
    count: Number
});

const recruitmentDetailsSchema = new mongoose.Schema({
    positionId: {type: mongoose.Schema.Types.ObjectId, ref: 'Position'},
    individualId: {type: mongoose.Schema.Types.ObjectId, ref: 'Individual'},
    date_receipt: Date,
    date_dismissal: {
        type: Date,
        default: null
    },
    salary: Number,
    rate: Number,
    charges: [ChargeSchema],
    mainWorkId: {type: mongoose.Schema.Types.ObjectId, ref: 'TypeWork'},
    typeBudgetId: {type: mongoose.Schema.Types.ObjectId, ref: 'TypeBudget'},
});

const recruitmentSchema = new mongoose.Schema({
    number: String,
    date: Date,
    companyId: {type: mongoose.Schema.Types.ObjectId, ref: 'Company'},
    details: [recruitmentDetailsSchema],
    createdAt: {
        type: Date,
        default: new Date()
    },
    updatedAt: {
        type: Date,
        default: null
    },
});

const Recruitments = mongoose.model('Recruitments', recruitmentSchema);

export default Recruitments;

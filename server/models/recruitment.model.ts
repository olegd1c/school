import * as mongoose from 'mongoose';
require('mongoose-moment')(mongoose);
var moment = require('moment');
//let mongooseDate = require("mongoose-date");

const ChargeSchema = new mongoose.Schema({
    typeChargeId: {type: mongoose.Schema.Types.ObjectId, ref: 'TypeCharge'},
    count: Number
});

const recruitmentSchema = new mongoose.Schema({
    number: String,
    date: {
        type: Date,
        default: null
    },
    companyId: {type: mongoose.Schema.Types.ObjectId, ref: 'Company'},
    positionId: {type: mongoose.Schema.Types.ObjectId, ref: 'Position'},
    individualId: {type: mongoose.Schema.Types.ObjectId, ref: 'Individual'},
    dateReceipt: {
        type: Date,
        default: null
    },
    dateDismissal: {
        type: Date,
        default: null
    },
    salary: Number,
    rate: Number,
     mainWorkId: {type: mongoose.Schema.Types.ObjectId, ref: 'TypeWork'},
    typeBudgetId: {type: mongoose.Schema.Types.ObjectId, ref: 'TypeBudget'},
    charges: [ChargeSchema],
    createdAt: {
        type: Date,
        default: new Date()
    },
    updatedAt: {
        type: Date,
        default: null
    },
});

/*
recruitmentSchema.virtual('company', {
    ref: 'Company',
    localField: '_id',
    foreignField: 'name'
  });
*/  

const Charges = mongoose.model('Charges', ChargeSchema);
const Recruitments = mongoose.model('Recruitments', recruitmentSchema);

export default Recruitments;
import * as mongoose from 'mongoose';

const employeeSchema = new mongoose.Schema({
    individualId: {type: mongoose.Schema.Types.ObjectId, ref: 'Individual'},
    typeChargeId: {type: mongoose.Schema.Types.ObjectId, ref: 'TypeCharge'},
    period_payment: Number,
    sum: Number,
});

const timeSheetSchema = new mongoose.Schema({
    date: Number,
    companyId: {type: mongoose.Schema.Types.ObjectId, ref: 'Company'},
    employees: [ employeeSchema ],
    total: Number,
    createdAt: {
        type: Date,
        default: new Date()
    },
    updatedAt: {
        type: Date,
        default: null
    },
});

const TimeSheet = mongoose.model('TimeSheet', timeSheetSchema);

export default TimeSheet;

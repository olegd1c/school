import * as mongoose from 'mongoose';

const employeeSchema = new mongoose.Schema({
    individualId: {type: mongoose.Schema.Types.ObjectId, ref: 'Individual'},
    positionId: {type: mongoose.Schema.Types.ObjectId, ref: 'Position'},
    countWorkDays: Number,
    countHospitalDays: Number,
    countVacationDays: Number,
    countNightShift: Number,
    salary: Number,
});

const timeSheetSchema = new mongoose.Schema({
    date: Date,
    number: Number,
    companyId: {type: mongoose.Schema.Types.ObjectId, ref: 'Company'},
    details: [ employeeSchema ],
    countWorkDayMounth: Number,
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

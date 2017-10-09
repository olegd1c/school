import * as mongoose from 'mongoose';

const settingSchema = new mongoose.Schema({
    percentPrepayment: Number,
    prepaymentId: {type: mongoose.Schema.Types.ObjectId, ref: 'TypePayment'},
    salaryId: {type: mongoose.Schema.Types.ObjectId, ref: 'TypePayment'},
    createdAt: {
        type: Date,
        default: new Date()
    },
    updatedAt: {
        type: Date,
        default: null
    },
});

const Setting = mongoose.model('Setting', settingSchema);

export default Setting;

import * as mongoose from 'mongoose';

const ChargeSchema = new mongoose.Schema({
    typeChargeId: {type: mongoose.Schema.Types.ObjectId, ref: 'TypeCharge'},
    month: {
        type: Date,
        default: null
    },
    sum: Number
});

const paymentDetailsSchema = new mongoose.Schema({
    
    individualId: {type: mongoose.Schema.Types.ObjectId, ref: 'Individual'},
    positionId: {type: mongoose.Schema.Types.ObjectId, ref: 'Position'},
    typeBudgetId: {type: mongoose.Schema.Types.ObjectId, ref: 'TypeBudget'},    
    charges: [ChargeSchema],
    total: Number
});

const paymentSchema = new mongoose.Schema({
    number: String,
    date: {
        type: Date,
        default: null
    },
    companyId: {type: mongoose.Schema.Types.ObjectId, ref: 'Company'},
    typeId: {type: mongoose.Schema.Types.ObjectId, ref: 'TypePayment'},
    details: [paymentDetailsSchema],
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

const Payment = mongoose.model('Payment', paymentSchema);

export default Payment;

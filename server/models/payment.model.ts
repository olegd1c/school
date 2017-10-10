import * as mongoose from 'mongoose';

const enum Budgeting {
    PLAN = 0,
    FACT = 1
  }

const paymentDetailsSchema = new mongoose.Schema({
    
    individualId: {type: mongoose.Schema.Types.ObjectId, ref: 'Individual'},
    positionId: {type: mongoose.Schema.Types.ObjectId, ref: 'Position'},
    typeBudgetId: {type: mongoose.Schema.Types.ObjectId, ref: 'TypeBudget'},    
    typeChargeId: {type: mongoose.Schema.Types.ObjectId, ref: 'TypeCharge'},
    month: {
        type: Date,
        default: null
    },
    sum: Number,
    budgeting: {
        type: Number,
        enum: [Budgeting.PLAN, Budgeting.FACT]
    }
});

const paymentSchema = new mongoose.Schema({
    number: String,
    date: {
        type: Date,
        default: null
    },
    companyId: {type: mongoose.Schema.Types.ObjectId, ref: 'Company'},
    typePaymentId: {type: mongoose.Schema.Types.ObjectId, ref: 'TypePayment'},
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

paymentSchema.pre('save', function (next) {
    let total = 0;
    this.details.forEach(element => {
        total = total + element.sum;    
    });
    next();
});

paymentSchema.pre('findOneAndUpdate', function () {
    const obj = this.getUpdate()['$set'];
    let total = 0;
    obj.details.forEach(element => {
        total = total + element.sum;    
    });
    this.findOneAndUpdate({}, { $set: { total: total } });
});

const Payment = mongoose.model('Payment', paymentSchema);

export default Payment;

import * as mongoose from 'mongoose';

const typePaymentSchema = new mongoose.Schema({
    name: String,	
    createdAt: {
        type: Date,
        default: new Date()
    },
    updatedAt: {
        type: Date,
        default: null
    },
});

const TypePayment = mongoose.model('TypePayment', typePaymentSchema);

export default TypePayment;

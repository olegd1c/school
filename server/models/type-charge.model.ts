import * as mongoose from 'mongoose';

const typeChargeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    type: Number,
    typeOperation: String,
    createdAt: {
        type: Date,
        default: new Date()
    },
    updatedAt: {
        type: Date,
        default: null
    },
});

const TypeCharge = mongoose.model('TypeCharge', typeChargeSchema);

export default TypeCharge;

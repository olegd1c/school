import * as mongoose from 'mongoose';

const typeChargeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
      },
    typeOperation: String,
    createdAt: {
        type: Number,
    },
    updatedAt: {
        type: Number,
        default: null
    },
});

const TypeCharge = mongoose.model('TypeCharge', typeChargeSchema);

export default TypeCharge;

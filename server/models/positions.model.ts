import * as mongoose from 'mongoose';

const positionSchema = new mongoose.Schema({
    name: String,
    typeChargeIds: [{type: mongoose.Schema.Types.ObjectId, ref: 'TypeCharge'}],
    createdAt: {
        type: Number,
    },
    updatedAt: {
        type: Number,
        default: null
    },
});

const Positions = mongoose.model('Position', positionSchema);

export default Positions;

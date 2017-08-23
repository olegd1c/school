import * as mongoose from 'mongoose';

const positionsSchema = new mongoose.Schema({
    name: String,
    typesСhargesId: [mongoose.Schema.Types.ObjectId],
    createdAt: {
        type: Number,
    },
    updatedAt: {
        type: Number,
        default: null
    },
});

const Positions = mongoose.model('Positions', positionsSchema);

export default Positions;

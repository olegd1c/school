import * as mongoose from 'mongoose';

const typeСhargeSchema = new mongoose.Schema({
    name: String,
    createdAt: {
        type: Number,
    },
    updatedAt: {
        type: Number,
        default: null
    },
});

const TypeСharge = mongoose.model('TypeСharge', typeСhargeSchema);

export default TypeСharge;

import * as mongoose from 'mongoose';

const typeWorkSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
      },
    createdAt: {
        type: Date,
        default: new Date()
    },
    updatedAt: {
        type: Date,
        default: null
    },
});

const TypeWork = mongoose.model('TypeWork', typeWorkSchema);

export default TypeWork;

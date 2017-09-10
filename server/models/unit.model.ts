import * as mongoose from 'mongoose';

const unitSchema = new mongoose.Schema({
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

const Unit = mongoose.model('Unit', unitSchema);

export default Unit;

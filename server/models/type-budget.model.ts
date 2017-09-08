import * as mongoose from 'mongoose';

const typeBudgetSchema = new mongoose.Schema({
    name: String,	
    account: Number,
    createdAt: {
        type: Date,
        default: new Date()
    },
    updatedAt: {
        type: Date,
        default: null
    },
});

const TypeBudgets = mongoose.model('TypeBudget', typeBudgetSchema);

export default TypeBudgets;

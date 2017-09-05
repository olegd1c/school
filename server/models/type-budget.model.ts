import * as mongoose from 'mongoose';

const typeBudgetSchema = new mongoose.Schema({
    name: String,	
    account: Number,
    createdAt: {
        type: Number,
    },
    updatedAt: {
        type: Number,
        default: null
    },
});

const TypeBudgets = mongoose.model('TypeBudget', typeBudgetSchema);

export default TypeBudgets;

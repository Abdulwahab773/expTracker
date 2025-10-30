import mongoose from "mongoose";

const expSchema = new mongoose.Schema({
    expenseTitle: {
        type: String,
    },
    expenseAmount: {
        type: Number,
    },
    date: {
        type: Date,
        default: Date.now
    },
    userId: {
        type: String
    }
});


const Expmodel = mongoose.model("expense", expSchema);
export default Expmodel;
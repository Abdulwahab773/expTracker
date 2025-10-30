import mongoose from "mongoose";

const incSchema = new mongoose.Schema({

  incomeTitle: {
    type: String,
  },
  incomeAmount: {
    type: Number,
  },
  date: {
    type: Date,
    default: Date.now
  },
  userId: {
    type: String 
  },
});


const incomeModel = mongoose.model("income", incSchema);
export default incomeModel;
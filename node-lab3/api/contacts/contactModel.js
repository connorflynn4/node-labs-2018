import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const ContactSchema = new Schema({
  name: String,
  address: String,
  age: {
    type: Number,
    min: 0,
    max: 120,
  },
  email: String,
  updated: {
    type: Date,
    default: Date.now,
  },
});


ContactSchema.path('address').validate((v)=>{
    if(v.length>50||v.length<5){
        return false;
    }
    return true;

});

export default mongoose.model('Contact', ContactSchema);
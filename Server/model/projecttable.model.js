const mongoose = require("mongoose");

const ProjectTableSchema = mongoose.Schema({
    logo:{type:String, required:true},
    name:{type:String, required:true},
    budget:{type:Number},
    status:{type:String, required:true},
    completion:{type:Number, required:true}
},{
    versionKey:false
})

const ProjectTableModel = mongoose.model("projectdetail", ProjectTableSchema)

module.exports = {
   ProjectTableModel
}
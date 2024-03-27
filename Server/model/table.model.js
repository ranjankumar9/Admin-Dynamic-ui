const mongoose = require("mongoose")

const TableSchema = mongoose.Schema({
    logo:{type:String, required:true},
    name:{type:String, required:true},
    email:{type:String, required:true},
    domain:{type:String, required:true},
    subdomain:{type:String, required:true},
    status:{type:String, required:true},
    date:{type:String, required:true}
},{
    versionKey:false,
})

const TableModel = mongoose.model("tabledetail", TableSchema)

module.exports = {
    TableModel
}
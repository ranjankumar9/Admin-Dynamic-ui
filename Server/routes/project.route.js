const express = require("express");
const { ProjectTableModel } = require("../model/projecttable.model");


const ProjectRouter = express.Router();

ProjectRouter.get("/project", async(req,res) => {
    try {
        const table = await ProjectTableModel.find({})
        res.status(200).json({data:table, msg:"Project data!"})
    } catch (err) {
        res.status(500).json({msg:"Internal Server Error!"})
    }
})

ProjectRouter.post("/project/add", async(req,res) => {
    try {
        const {logo, name, budget, status, completion} = req.body;
        const table = new ProjectTableModel({logo, name, budget, status, completion})
        await table.save()
        res.status(201).json({msg:"Project data Added Successfully!"})
    } catch (err) {
        res.status(500).json({msg:"Project data Added Failed!", error:err})
    }
})

ProjectRouter.patch("/project/update/:id", async(req,res) => {
    const {id} = req.params;
    const {logo, name, budget, status, completion} = req.body;
    const params = {logo, name, budget, status, completion}
    try {
        const table = await ProjectTableModel.findByIdAndUpdate({_id:id}, params)
        res.status(201).json({msg:"Project Data Updated Successfully!", data:table})
    } catch (err) {
        res.status(500).json({msg:"Project Data Updated Failed!", error:err})
    }
})

ProjectRouter.delete("/project/delete/:id", async(req,res) => {
    const {id} = req.params;
    try {
        const table = await ProjectTableModel.findByIdAndDelete({_id:id})
        res.status(201).json({msg:"Project Data Deleted Successfully",data:table})
    } catch (err) {
        res.status(500).json({msg:"Project Data Deletetion Failed!", error:err})
    }

})


module.exports = {
    ProjectRouter
}
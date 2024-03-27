const express = require("express");
const { TableModel } = require("../model/table.model");

const TableRouter = express.Router()

TableRouter.get("/author", async(req,res) => {
    try {
        const table = await TableModel.find({})
        res.status(200).json({data:table, msg:"Table data!"})
    } catch (err) {
        res.status(500).json({msg:"Internal Server Error!"})
    }
})

TableRouter.post("/author/add", async(req,res) => {
    try {
        const {logo, name, email, domain, subdomain, status, date} = req.body;
        const table = new TableModel({logo, name, email, domain, subdomain, status, date})
        await table.save()
        res.status(201).json({msg:"Table Row data Added Successfully!"})
    } catch (err) {
        res.status(500).json({msg:"Table Row data Added Failed!", error:err})
    }
})

TableRouter.patch("/author/update/:id", async(req,res) => {
    const {id} = req.params;
    const {logo, name, email, domain, subdomain, status, date} = req.body;
    const params = {logo, name, email, domain, subdomain, status, date}
    try {
        const table = await TableModel.findByIdAndUpdate({_id:id}, params)
        res.status(201).json({msg:"Table Data Updated Successfully!", data:table})
    } catch (err) {
        res.status(500).json({msg:"Table Data Updated Failed!", error:err})
    }
})

TableRouter.delete("/author/delete/:id", async(req,res) => {
    const {id} = req.params;
    try {
        const table = await TableModel.findByIdAndDelete({_id:id})
        res.status(201).json({msg:"Table Data Deleted Successfully"})
    } catch (err) {
        res.status(500).json({msg:"Table Data Deletetion Failed!", error:err})
    }

})


module.exports = {
    TableRouter
}
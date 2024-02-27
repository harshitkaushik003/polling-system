const Question = require("../models/Question")
const Option = require('../models/Option');
module.exports = {
    create: async (req, res)=>{
        try {
            console.log(req.body);
            let ques = await Question.create({
                title: req.body.title
            });
            return res.status(200).json({message: "Question created successfully", data: ques});
        } catch (error) {
            console.log(error);
            return res.status(400).json({message: "Internal Server Error", error: error.message});
        }
    },
    view: async (req, res)=>{
        try {
            const question = await Question.findById(req.params.id).populate("options");
            if(question){
                return res.status(200).json(
                    {
                        message: "Question found",
                        question: question
                    }
                )
            }else{
                return res.status(404).json({message: "Question not found"});
            }
        } catch (error) {
            return res.status(500).json({message: "Internal Server Error", error: error});
        }
    },
    destroy: async (req, res)=>{
        try {
            const deletedQuestion = await  Question.findByIdAndDelete(req.params.id);
            if(!deletedQuestion){
                return res.status(404).json({message: "Question not found, check the id"});
            }else{
                try {
                    await Option.deleteMany({question: req.params.id});  
                    return res.status(200).json({message: "Question deleted successfully"});       
                } catch (error) {
                    return res.status(500).json({message: "Error in deleting options", error: error.message});
                }
                
            }
        } catch (error) {
            return res.status(500).json({message: "Error in deleting question", error: error.message});
        }
    }
}
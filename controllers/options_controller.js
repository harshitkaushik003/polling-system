const Question = require("../models/Question");
const Option = require("../models/Option");

module.exports = {
    create: async (req, res)=>{
        try {
            const question =await  Question.findById(req.params.id);
            if(question){
                if(question.options.length >= 4){
                    return res.status(401).json({message: "Only 4 Options allowed per question"});
                }else{
                    const option = await Option.create({
                        text : req.body.text,
                        votes: 0,
                        question: question._id
                    });

                    option.link_to_vote = `http://localhost:8000/options/${option._id}/add_vote`;
                    await option.save();
    
                    question.options.push(option);
                    await question.save();
    
                    return res.status(200).json(
                        {
                            message: "Option added",
                            option: option
                        }
                    )
                }
            }
        } catch (error) {
            return res.status(500).json({message: "Internal Server Error", error: error} );
        }
    },
    addVote: async (req, res)=>{
        try {
            let option = await Option.findById(req.params.id).populate('question');
            if(!option){
                return res.status(404).json({message: "Not found"});
            }
            option.votes += 1;
            await option.save();
            return res.status(200).json({message: "Voted", option: option});
            
        } catch (error) {
            return res.status(500).json({message: "Internal Server error", error: error.message});
        }
    },
    destroy: async (req, res)=>{
        try {
            let deletedOption = await Option.findByIdAndDelete(req.params.id);
            if(!deletedOption){
                return res.status(404).json({message: "Bad Parameters"});
            }else{
                let question = await Question.findByIdAndUpdate(deletedOption.question,
                    {$pull : {options: deletedOption._id}},
                    {new: true}
                ).populate({
                    path: "options",
                    select: "-question"
                });

                if(question){
                    return res.status(200).json({
                        message: "Option removed successfully",
                        question: question
                    })
                }else{
                    return res.status(400).json({
                        message: "Question not found"
                    })
                }
            }
        } catch (error) {
            return res.status(500).json({
                message: "Internal server error",
                error: error.message
            })
        }
    }
}
const User = require("../models/User");
const XLSX = require("xlsx");
const Income = require("../models/Income");


exports.addIncome = async(req, res) => {
    
   const userId = req.userId;
    try{
        const {icon, source, amount, date} = req.body;
        if(!source || !amount || !date){ 
            return res.status(400).json({message:"Please provide all required fields"});
        }
        
        const newIncome = new Income({
            userId,
            icon,
            source,
            amount,
            date:new Date(date),
        });

        await newIncome.save();
        res.status(200).json(newIncome);
 
    }
    catch(error){
        res.status(500).json({message:"Server Error"});
    }

}
exports.getAllIncome = async(req, res) => {
    const userId = req.userId;
    try{
        const incomes = await Income.find({userId}).sort({date:-1});
        res.status(200).json(incomes);
    }catch(error){
        res.status(500).json({message:"Server Error"});
    }
}  ;
exports.deleteIncome = async(req, res) => {
  try{
    await Income.findOneAndDelete({_id:req.params.id});
    res.status(200).json({message:"Income deleted successfully"});
  }catch(error){
    res.status(500).json({message:"Server Error"});
  }
} ; 
exports.downloadIncomeExcel = async(req, res) => {
  const userId = req.userId;
  try{
    const income =  await Income.find({userId}).sort({date:-1});
    const data = income.map((item) => ({
        Source: item.source,
        Amount: item.amount,
        Date: item.date,
  }
)
    );
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(data);
    XLSX.utils.book_append_sheet(wb, ws, "Income");
    XLSX.writeFile(wb, "income_details.xlsx");
    res.download("income_details.xlsx");
  } 
  catch(error){
    res.status(500).json({message:"Server Error"});
  }
};
import React,{useEffect, useState} from 'react'
import { useUserAuth } from '../../hooks/useUserAuth'
import DashboardLayout from '../../components/layouts/DashboardLayout';
import axiosInstance from '../../utils/axiosinstance';
import { API_PATHS } from '../../utils/apiPaths';
import { toast } from 'react-hot-toast';
import ExpenseOverview from '../../components/Expense/ExpenseOverview';
import Modal from '../../components/Modal';
import AddExpenseForm from '../../components/Expense/AddExpenseForm';
import DeleteAlert from '../../components/DeleteAlert';
import ExpenseList from '../../components/Expense/ExpenseList';
const Expense = () => {
  useUserAuth();

   const [expenseData,setExpenseData]=useState([]);
      const [loading,setLoading]=useState(false);
      const [openDeleteAlert,setOpenDeleteAlert]=useState({
          show:false,
          data:null,
      });
      
      
      const [openAddExpenseModal,setOpenAddExpenseModal]=useState(false);
  
    const fetchExpenseDetails=async ()=>{

   if(loading) return;
   setLoading(true);
   try{
    const response = await axiosInstance.get(
        `${API_PATHS.EXPENSE.GET_ALL_EXPENSES}`
    );
    if(response.data){
        setExpenseData(response.data);
    }
   }catch(error){
    console.log("Something went Wrong. Please Try again later..",error);

   }
   finally{
    setLoading(false);
   }



   };
   
   const handleAddExpense=async (expense)=>{
    const {category,amount,date,icon}=expense;

    if(!category.trim()){
        toast.error("Expense category is required");
        return;
    }
    if(!amount || isNaN(amount) || Number(amount)<=0){
        toast.error("Please enter a valid amount and greater than zero");
        return;
    }
    if(!date){
        toast.error("Please select a date");
        return;
    }
    try{
        await axiosInstance.post(
            API_PATHS.EXPENSE.ADD_EXPENSE,
            {
                category,
                amount,
                date,
                icon
            }
        );
        toast.success("Expense added successfully");
        setOpenAddExpenseModal(false);
        fetchExpenseDetails();
    }catch(error){
        console.error("Failed to add expense",error.response?.data?.message || error.message);
    }
   };

     const deleteExpense = async(id)=>{
    try{
        await axiosInstance.delete(
            API_PATHS.EXPENSE.DELETE_EXPENSE(id)
        );
        setOpenDeleteAlert({show:false,data:null});
        toast.success("Expense deleted successfully");
        fetchExpenseDetails();
    }
    catch(error){
        console.error("Failed to delete expense",error.response?.data?.message || error.message);
    }
   };

    const handleDownloadExpenseDetails=async ()=>{
    try{
         const response = await axiosInstance.get(
            API_PATHS.EXPENSE.DOWNLOAD_EXPENSE,
            {
                responseType:"blob",
            }
        );
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download","expense_details.csv");
        document.body.appendChild(link);
        link.click();
        link.parentNode.removeChild(link);
        window.URL.revokeObjectURL(url);    
    }
    catch(error){
        console.error("Failed to download expense details",error.response?.data?.message || error.message);
        toast.error("Failed to Download");
    }
};

  useEffect(()=>{
    fetchExpenseDetails();
    return ()=>{};
  },[]);


  return (
    <DashboardLayout activeMenu="Expense">
    <div className='my-5 mx-auto'>
      <div className='grid grid-cols-1 gap-6'>
        <div className=''>
          <ExpenseOverview
           transactions={expenseData}
           onExpenseIncome={()=> setOpenAddExpenseModal(true)}
           />
        </div>
        <ExpenseList
                 transactions={expenseData}
                 onDelete={(id)=> setOpenDeleteAlert({show:true,data:id})}
                 onDownload={handleDownloadExpenseDetails}
                 />
      </div>
       <Modal
              isOpen={openAddExpenseModal}
              onClose={()=> setOpenAddExpenseModal(false)}
              title="Add Expense"
            >
                
            <AddExpenseForm onAddExpense={handleAddExpense}/>
                 
                
            </Modal>
            <Modal
            isOpen={openDeleteAlert?.show}
            onClose={()=> setOpenDeleteAlert({show:false,data:null})}
            title="Delete Expense"
            >
            <DeleteAlert
             content="Are you sure you want to delete this expense?"
             onDelete={()=> deleteExpense(openDeleteAlert.data)}
            />
            </Modal>


    </div>
    </DashboardLayout>
  )
};

export default Expense

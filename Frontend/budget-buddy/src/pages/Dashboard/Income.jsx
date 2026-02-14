import React, { useEffect, useState } from "react";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import IncomeOverview from "../../components/Income/IncomeOverview";
import axiosInstance from "../../utils/axiosinstance";
import { API_PATHS } from "../../utils/apiPaths";
import Modal from "../../components/Modal";
import AddIncomeForm from "../../components/Income/AddIncomeForm";
import { toast } from "react-hot-toast";
import IncomeList from "../../components/Income/IncomeList";
import DeleteAlert from "../../components/DeleteAlert";
import { useUserAuth } from "../../hooks/useUserAuth";
const Income = () => {
    useUserAuth();
   
    const [incomeData,setIncomeData]=useState([]);
    const [loading,setLoading]=useState(false);
    const [openDeleteAlert,setOpenDeleteAlert]=useState({
        show:false,
        data:null,
    });
    
    
    const [openAddIncomeModal,setOpenAddIncomeModal]=useState(false);


   const fetchIncomeDetails=async ()=>{

   if(loading) return;
   setLoading(true);
   try{
    const response = await axiosInstance.get(
        `${API_PATHS.INCOME.GET_ALL_INCOME}`
    );
    if(response.data){
        setIncomeData(response.data);
    }
   }catch(error){
    console.log("Something went Wrong. Please Try again later..",error);

   }
   finally{
    setLoading(false);
   }



   };
   
   const handleAddIncome=async (income)=>{
    const {source,amount,date,icon}=income;

    if(!source.trim()){
        toast.error("Income source is required");
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
            API_PATHS.INCOME.ADD_INCOME,
            {
                source,
                amount,
                date,
                icon
            }
        );
        toast.success("Income added successfully");
        setOpenAddIncomeModal(false);
        fetchIncomeDetails();
    }catch(error){
        console.error("Failed to add income",error.response?.data?.message || error.message);
    }
   };


   const deleteIncome = async(id)=>{
    try{
        await axiosInstance.delete(
            API_PATHS.INCOME.DELETE_INCOME(id)
        );
        setOpenDeleteAlert({show:false,data:null});
        toast.success("Income deleted successfully");
        fetchIncomeDetails();
    }
    catch(error){
        console.error("Failed to delete income",error.response?.data?.message || error.message);
    }
   };

   
    const handleDownloadIncomeDetails=async ()=>{
    try{
         const response = await axiosInstance.get(
            API_PATHS.INCOME.DOWNLOAD_INCOME,
            {
                responseType:"blob",
            }
        );
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download","income_details.csv");
        document.body.appendChild(link);
        link.click();
        link.parentNode.removeChild(link);
        window.URL.revokeObjectURL(url);    
    }
    catch(error){
        console.error("Failed to download income details",error.response?.data?.message || error.message);
        toast.error("Failed to Download");
    }
};

   useEffect(()=> {
    fetchIncomeDetails();

    return ()=>{};
   },[]);


  return (
    <DashboardLayout activeMenu="Income">
        <div className="my-5 mx-auto">
            <div className="grid grid-cols-1 gap-6">
                <div className="">
                    <IncomeOverview
                     transactions={incomeData}
                     onAddIncome={()=> setOpenAddIncomeModal(true)}
                     />
                </div>
                <IncomeList
                 transactions={incomeData}
                 onDelete={(id)=> setOpenDeleteAlert({show:true,data:id})}
                 onDownload={handleDownloadIncomeDetails}
                 />
            </div>
            <Modal
              isOpen={openAddIncomeModal}
              onClose={()=> setOpenAddIncomeModal(false)}
              title="Add Income"
            >
                
            <AddIncomeForm onAddIncome={handleAddIncome}/>
                 
                
            </Modal>
            <Modal
            isOpen={openDeleteAlert?.show}
            onClose={()=> setOpenDeleteAlert({show:false,data:null})}
            title="Delete Income"
            >
            <DeleteAlert
             content="Are you sure you want to delete this income?"
             onDelete={()=> deleteIncome(openDeleteAlert.data)}
            />
            </Modal>


        </div>
    </DashboardLayout>
  );
};

export default Income;

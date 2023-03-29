import {useEffect, useState} from 'react'
import { useGetUnqiueRolesQuery } from 'state/formApi';

//Removing ID Field i will have to query that on the backend to update the entry based on the selected company_id, role and link
const useJobInfo = () => {
  const [selectedCompany, setSelectedCompany] = useState({id: '',company_name:''})
  const [selectedJob, setSelectedJob] = useState({company_id:'',role_id:'',link:'',description:''})
  const [selectRole,setSelectedRole] = useState({id:"",role_name:""})
  const {data} = useGetUnqiueRolesQuery(selectedCompany.id, { skip: selectedCompany.id === '' })

  const clearFilters = () => {
    setSelectedCompany({id: '',company_name:''})
    setSelectedJob({company_id:'',role_id:'',link:'',description:''})
  }
  const clearJobFilters = () => {
    setSelectedJob({company_id:'',role_id:'',link:'',description:''})
  }
  const clearCompanyFilters = () => {
    setSelectedCompany({id: '',company_name:''})
  }

  const handleSelectedCompany = (option) => {
    clearFilters()
    setSelectedCompany({id:option.value,company_name:option.label})
    setSelectedJob((prevData) => {return {...prevData, company_id:option.value}})
  }

  // This has to be updated to the unique job then append the role to the selectedJob
  const handleSelectedJob = (role) => {
    setSelectedJob((prevData) => {return {...prevData, role:role.label}})
  };

  // const handleSelectedJobChange = (e) => {
  //   setSelectedJob({...selectedJob, [e.target.name]: e.target.value})
  // }

  console.log('Selected Company',selectedCompany, "Selected Job", selectedJob)
  return (
    [
      selectedCompany,
      setSelectedCompany,
      handleSelectedCompany,
      selectedJob,
      setSelectedJob,
      handleSelectedJob,
      // handleSelectedJobChange,
      clearJobFilters,
      clearCompanyFilters
    ]
  )
}

export default useJobInfo
import {useState} from 'react'

const useJobInfo = () => {
  const [selectedCompany, setSelectedCompany] = useState({id: '',company_name:''})
  const [selectedJob, setSelectedJob] = useState({company_id:'',role_id:'',link:'',description:''})
  const [selectedRole,setSelectedRole] = useState({id:'',role_name:''})

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
  const clearRoleFilters = () => {
    setSelectedRole({id: '',role_name:''})
  }

  const handleSelectedCompany = (option) => {
    clearFilters()
    setSelectedCompany({id:option.value,company_name:option.label})
    setSelectedJob((prevData) => {return {...prevData, company_id:option.value}})
  }

  const handleSelectedJob = (role) => {
    clearRoleFilters()
    console.log('handleselectedjob',role)
    setSelectedRole({ id: role.value, role_name: role.label });
    setSelectedJob((prevData) => {
      return { ...prevData, role_id: role.value };
    });
  };

  return (
    [
      selectedCompany,
      setSelectedCompany,
      handleSelectedCompany,
      selectedJob,
      setSelectedJob,
      handleSelectedJob,
      selectedRole,
      setSelectedRole,
      clearJobFilters,
      clearCompanyFilters,
      clearRoleFilters,
    ]
  )
}

export default useJobInfo
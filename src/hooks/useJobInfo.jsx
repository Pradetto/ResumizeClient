import {useEffect, useState} from 'react'
import { useGetJobsListQuery } from 'state/formApi';

const useJobInfo = () => {
  const [selectedCompany, setSelectedCompany] = useState({id: '',company_name:''})
  const [selectedJob, setSelectedJob] = useState({id:'',company_id:'',role:'',link:'',description:''})
  const {data} = useGetJobsListQuery(selectedCompany.id, { skip: selectedCompany.id === '' })

  const clearJobFilters = () => {
    setSelectedCompany({id: '',company_name:''})
    setSelectedJob({id:'',company_id:'',role:'',link:'',description:''})
  }

  const handleSelectedCompany = (option) => {
    clearJobFilters()
    setSelectedCompany({id:option.value,company_name:option.label})
  }

  const handleSelectedJob = (option) => {
    const job = data.find((job) => job.id === option.value);
    console.log(job)
    setSelectedJob(job);
  };

  const handleSelectedJobChange = (e) => {
    setSelectedJob({...selectedJob, [e.target.name]: e.target.value})
  }

  return (
    [
      selectedCompany,
      setSelectedCompany,
      handleSelectedCompany,
      selectedJob,
      setSelectedJob,
      handleSelectedJob,
      handleSelectedJobChange
    ]
  )
}

export default useJobInfo
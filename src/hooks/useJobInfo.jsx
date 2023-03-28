import {useEffect, useState} from 'react'
import { useGetJobsListQuery } from 'state/formApi';

const useJobInfo = () => {
  const [selectedCompany, setSelectedCompany] = useState({id: '',company_name:''})
  const [selectedJob, setSelectedJob] = useState({id:'',company_id:'',role:'',link:'',description:''})
  const {data} = useGetJobsListQuery(selectedCompany.id, { skip: selectedCompany.id === '' })

  const clearFilters = () => {
    setSelectedCompany({id: '',company_name:''})
    setSelectedJob({id:'',company_id:'',role:'',link:'',description:''})
  }

  const handleSelectedCompany = (option) => {
    clearFilters()
    setSelectedCompany({id:option.value,company_name:option.label})
  }

  const handleSelectedJob = (option) => {
    const job = data.find((job) => job.id === option.value);
    setSelectedJob(job);
  };

  return (
    [
      selectedCompany,
      setSelectedCompany,
      handleSelectedCompany,
      selectedJob,
      setSelectedJob,
      handleSelectedJob
    ]
  )
}

export default useJobInfo
import { useState } from 'react'

const useHiringManagerAndInstructions = () => {
  const [coverLetterInstructions, setCoverLetterInstructions] = useState('');
  const [selectedHiringManager, setSelectedHiringManager] = useState({
    id: '',
    name: '',
    email: '',
    phone: '',
    address: '',
  });

  const clearHiringManagerFilters = () => {
    setSelectedHiringManager({id: '',name: '',email: '',phone: '',address: '',})
  }

  const clearCoverLetterInstructions = () => {
    setCoverLetterInstructions('')
  }

  const handleHiringManagerChange = (e) => {
    const key = e.target.name;
    const value = e.target.value;
    setSelectedHiringManager(prevState => ({
      ...prevState,
      [key]: value
    }));
  };
  return [
    coverLetterInstructions,
    setCoverLetterInstructions,
    selectedHiringManager,
    setSelectedHiringManager,
    handleHiringManagerChange,
    clearHiringManagerFilters,
    clearCoverLetterInstructions
  ];
};

export default useHiringManagerAndInstructions;
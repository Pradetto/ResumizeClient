import {useState, useEffect} from 'react'
import { useUploadFileMutation } from 'state/generalApi';

const useResumeUpload = () => {
    /* RESUME STATE */
    // const [resumeFile, setResumeFile] = useState(null);
    const [resumeUploadStatus,setResumeUploadStatus] = useState('')
    const [uploadFile] = useUploadFileMutation()
    const [isDefault,setIsDefault] = useState(false)
    const [uploadeResumedFile, setUploadedResumeFile] = useState(null)
    const [selectedResumeFile,setSelectedResumeFile] = useState('')
    const [showUpload, setShowUpload] = useState(true);

    const handleResumeChange = (e) => {
        if (e.target.type === 'file') {
            setUploadedResumeFile(e.target.files[0]);
        } else if (e.target.type === 'select-one') {
            setSelectedResumeFile(e.target.value);
        }
    };

    useEffect(() => {
    const handleResumeUpload = async () => {
        if (!uploadeResumedFile) return;

        try {
            const formData = new FormData()
            formData.append("file",uploadeResumedFile)
            console.log('here is form data',formData)
            const result = await uploadFile(formData).unwrap()

            if (result.url) {
                setResumeUploadStatus(`File uploaded successfully at ${result.url}`)
            } else {
                setResumeUploadStatus("Error uploading file")
            }
        } catch (err){
            setResumeUploadStatus("Error uploading file" + err.message)
        }
    }

    if (uploadeResumedFile){
        handleResumeUpload()
    }
    },[uploadeResumedFile, uploadFile])




  return (
    [
    uploadeResumedFile,
    setUploadedResumeFile,
    selectedResumeFile,
    setSelectedResumeFile,
    resumeUploadStatus,
    handleResumeChange,
    isDefault,
    setIsDefault,
    showUpload,
    setShowUpload
    ]
  )
}

export default useResumeUpload
import {useState, useEffect} from 'react'
import { useGetResumeListQuery, useUploadFileMutation } from 'state/generalApi';
import useCustomToast from './useCustomToast';

const useResumeUpload = () => {
    /* RESUME STATE */
    const [uploadFile] = useUploadFileMutation();
    const {data:resumeListData} = useGetResumeListQuery()
    const [isDefault,setIsDefault] = useState(false)
    const [selectedResumeFile,setSelectedResumeFile] = useState('')
    const [showUpload, setShowUpload] = useState(true);
    const customToast = useCustomToast()

    useEffect(() => {
        const defaultResume = resumeListData?.find((resume) => resume.is_default === true);
        if (defaultResume) {
            setSelectedResumeFile(defaultResume.file_key);
            setIsDefault(true)
        }
    }, [resumeListData]);

    const handleResumeChange = (e) => {
        if (e.target.type === 'file') {
            handleResumeUpload(e.target.files[0])
        } else if (e.target.type === 'select-one') {
            setSelectedResumeFile(e.target.value);
        }
    };

    // useEffect(() => {
    const handleResumeUpload = async (uploadResumedFile) => {
        if (!uploadResumedFile) return;

        try {
            const formData = new FormData()
            formData.append("file",uploadResumedFile)
            formData.append("isDefault",isDefault)
            await uploadFile(formData).unwrap()
            customToast({
            title: "Succesful resume upload",
            description: "You have successfully uploaded your resume.",
            status: "success",
            });
            setShowUpload(!showUpload)
        } catch (err){
            console.error("Upload resume error:", err);
            customToast({
            title: "Upload resume error",
            description: `${err.data.message}`,
            status: "error",
            });
        }
    }

  return (
    [
    selectedResumeFile,
    setSelectedResumeFile,
    handleResumeChange,
    isDefault,
    setIsDefault,
    showUpload,
    setShowUpload
    ]
  )
}

export default useResumeUpload
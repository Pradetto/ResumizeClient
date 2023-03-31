import {useState, useEffect} from 'react'
import { useGetResumeListQuery, useUploadFileMutation } from 'state/formApi';
import useCustomToast from './useCustomToast';

const useResumeUpload = () => {
    /* RESUME STATE */
    const [uploadFile] = useUploadFileMutation();
    const {data:resumeListData} = useGetResumeListQuery()
    const [showUpload, setShowUpload] = useState(true);
    const [selectedResumeData, setSelectedResumeData] = useState({
        id:'',
        user_id:'',
        file_key:'',
        is_default: false
    })
    const customToast = useCustomToast()

    useEffect(() => {
        const defaultResume = resumeListData?.find((resume) => resume.is_default === true);
        if (defaultResume) {
            setSelectedResumeData({
            id: defaultResume.id,
            user_id: defaultResume.user_id,
            file_key: defaultResume.file_key,
            is_default: defaultResume.is_default,
            });
        }
    }, [resumeListData]);

    const handleResumeSelect = (option) => {
    if (option) {
        const newSelectedResume = option.value;
        const resume = resumeListData?.find(
        (resume) => resume.file_key === newSelectedResume
        );
        setSelectedResumeData({
        id: resume.id,
        user_id: resume.user_id,
        file_key: resume.file_key,
        is_default: resume.is_default,
        });
    }
    };

    const handleFileInputChange = (e) => {
    if (e.target.type === 'file') {
        handleResumeUpload(e.target.files[0]);
    }
    };

    const handleResumeUpload = async (uploadResumedFile) => {
        if (!uploadResumedFile) return;

        console.log("made it")
        try {
            const formData = new FormData()
            formData.append("file",uploadResumedFile)
            formData.append("isDefault",  selectedResumeData.is_default ? '1' : '0')
            console.log('1')
            await uploadFile(formData).unwrap()
            console.log('2')
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
    showUpload,
    setShowUpload,
    handleFileInputChange,
    handleResumeSelect,
    selectedResumeData,
    setSelectedResumeData
    ]
  )
}

export default useResumeUpload
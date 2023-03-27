import {useState, useEffect} from 'react'
import { useGetResumeListQuery, useUploadFileMutation } from 'state/generalApi';
import useCustomToast from './useCustomToast';

const useResumeUpload = () => {
    /* RESUME STATE */
    // const [resumeFile, setResumeFile] = useState(null);
    const [uploadFile] = useUploadFileMutation();
    const {data:resumeListData} = useGetResumeListQuery()
    const [isDefault,setIsDefault] = useState(false)
    const [uploadResumedFile, setUploadedResumeFile] = useState(null)
    const [selectedResumeFile,setSelectedResumeFile] = useState(null)
    const [showUpload, setShowUpload] = useState(true);
    const [resumeList, setResumeList] = useState([])
    const customToast = useCustomToast()

    useEffect(() => {
        const defaultResume = resumeListData?.find((resume) => resume.is_default === true);
        if (defaultResume) {
            console.log('default resume found', defaultResume)
            setSelectedResumeFile(defaultResume.file_key);
            setIsDefault(true)
        }
    }, [resumeListData]);

    const handleResumeChange = (e) => {
        if (e.target.type === 'file') {
            setUploadedResumeFile(e.target.files[0]);
            handleResumeUpload()
        } else if (e.target.type === 'select-one') {
            setSelectedResumeFile(e.target.value);
        }
    };

    // useEffect(() => {
    const handleResumeUpload = async () => {
        if (!uploadResumedFile) return;

        try {
            const formData = new FormData()
            formData.append("file",uploadResumedFile)
            formData.append("isDefault",isDefault)
            console.log('here is form data',formData)
            const result = await uploadFile(formData).unwrap()
            customToast({
            title: "Succesful resume upload",
            description: "You have successfully uploaded your resume.",
            status: "success",
            });
        } catch (err){
            console.error("Upload resume error:", err);
            customToast({
            title: "Upload resume error",
            description: `${err.data.message}`,
            status: "error",
            });
        }
    }


    // if (uploadResumedFile){
    //     handleResumeUpload()
    // }
    // },[uploadResumedFile, uploadFile,isDefault, customToast])


    // const handleResumeUpload = async () => {
    //     if (!uploadeResumedFile) return;

    //     try {
    //         const formData = new FormData()
    //         formData.append("file",uploadeResumedFile)
    //         formData.append("isDefault",isDefault)
    //         console.log('here is form data',formData)
    //         const result = await uploadFile(formData).unwrap()

    //             customToast({
    //             title: "Succesful resume upload",
    //             description: "You have successfully uploaded your resume.",
    //             status: "success",
    //             });
    //     } catch (err){
    //         console.error("Upload resume error:", err);
    //         customToast({
    //         title: "Upload resume error",
    //         description: `${err.data.message}`,
    //         status: "error",
    //         });
    //     }
    // }

    // useEffect(() => {
    //     handleResumeUpload();
    // }, [uploadResumedFile, handleResumeUpload]);

  return (
    [
    uploadResumedFile,
    setUploadedResumeFile,
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
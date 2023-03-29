import React from 'react'
import { 
  Button,
  Textarea
} from '@chakra-ui/react';
import CreatableSelect from 'react-select/creatable';
import FormTitle from 'components/FormTitle';
import { useCreateRoleMutation, useGetCompaniesListQuery, useGetUnqiueRolesQuery, useInsertCompanyMutation,useGetExistingLinkQuery, useDeleteDraftsMutation } from 'state/formApi';
import useCustomToast from 'hooks/useCustomToast';

const JobInfo = ({
  selectedCompany,
  setSelectedCompany,
  handleSelectedCompany,
  selectedJob,
  setSelectedJob,
  handleSelectedJob,
  clearJobFilters,
  clearCompanyFilters,
}) => {
  const {data: companiesListData} = useGetCompaniesListQuery()
  const [insertCompany] = useInsertCompanyMutation()
  const [createLink] = useCreateRoleMutation()
  const [createRole] = useCreateRoleMutation()
  const [deleteDrafts] = useDeleteDraftsMutation()
  const {data: uniqueRoleData} = useGetUnqiueRolesQuery(selectedCompany.id, { skip: selectedCompany.id === '' })
  const {data: existingLink} = useGetExistingLinkQuery(selectedJob.link, {skip:selectedJob.link === ''})
  
  const customToast = useCustomToast()

  const customComponents = {
    DropdownIndicator: () => null, // Remove the dropdown indicator
    IndicatorSeparator: () => null, // Remove the separator
    // Menu: () => null, // Remove the menu
  };

  const customStyles = {
    control: (base, state) => ({
      ...base,
      borderBottom: state.isFocused ? '2px solid #3182ce' : '2px solid #e2e8f0', // Customize the border color when focused
      borderRadius: 0,
      boxShadow: 'none',
    }),
  };
return (
  <>

    {/* COMPANY */}
    <FormTitle htmlFor="company" isRequired={true} text="Company">
      <CreatableSelect
        id="company"
        value={
          selectedCompany.id && selectedCompany.company_name
            ? {
                value: selectedCompany.id,
                label: selectedCompany.company_name,
              }
            : null
        }
        onChange={(option) => handleSelectedCompany(option)}
        onCreateOption={async (newCompanyName) => {
          const res = await insertCompany({ company_name: newCompanyName });
          setSelectedCompany({ id: res.data.id, company_name: res.data.company_name, link: '', description: '' });
        }}
        options={
          companiesListData?.map((company) => ({
            value: company.id,
            label: company.company_name,
          })) || []
        }
        placeholder="Select or type to create..."
        required
      />
    </FormTitle>
    


    {/* LINK */}
    {selectedCompany.id !== '' &&
    <FormTitle htmlFor="link" isRequired={true} text="Job Link (URL)" tooltipLabel="Paste a unqiue URL that you haven't used in the paste. There is an error handler to prevent you from making duplicate cover letters for a job. Please try delete drafts button if you disconnected while trying to submit the form. If it still does not work after that visit the files page and edit it there.">
      <CreatableSelect
        id="link"
        name="link"
        value={
          selectedJob.link
            ? {
                value: selectedJob.link,
                label: selectedJob.link,
              }
            : null
        }
        // onChange={handleSelectedJobChange}
        onCreateOption={(value) => {
          console.log(value)
          setSelectedJob((prevData) => {
            return {...prevData,link: value}
          })
        }}
        placeholder={jobUrlPlaceholder}
        required
        components={customComponents}
        styles={customStyles}
        noOptionsMessage={() => 'Press Enter or click here to create'}
        formatCreateLabel={(inputValue) => `Create "${inputValue}"`}
      />
    </FormTitle>
    }


    {/* ROLE */}
    {selectedJob.link && (
      <FormTitle htmlFor="role" isRequired={true} text="Role" tooltipLabel="This is the job title you are applying too.">
      <CreatableSelect
        id="role"
        value={
          selectedJob.role_id
            ? {
                value: selectedJob.role_id,
                label: selectedJob.role_id,
              }
            : null
        }
        onChange={(option) => handleSelectedJob(option)}
        onCreateOption={async (newRole) => {
          try {
            const res = await createRole({
              company_id: selectedCompany.id,
              role_id: newRole,
              link: selectedJob.link,
              description: '',
            });
            console.log("this duplicate",res.error)
            if (res.ok){
              setSelectedJob(res.data)
            } else if (res.error.data.message === "The link already exists for this user") {
              throw new Error ("Duplicate")
            } else {
              throw new Error ('Error inserting creating Role')
            }
          } catch (error) {
            console.error(error.message);
            //will have to update here
            // console.log(error)
            if (error.message === 'Duplicate'){
              customToast({
                title: "Error job link already exists",
                description: `Pleae update this exisitng link.`,
                status: "error",
              });
              try {
                console.log(existingLink)
                setSelectedJob({company_id:'',role:'',link:'',description:''})
              } catch (err){
                console.error(err.message)
                setSelectedJob({company_id:'',role:'',link:'',description:''})
              }
            } else {
              customToast({
              title: "Error creating role and job link",
              description: `Please try creating the role and job link again`,
              status: "error",
              });
              setSelectedJob((prevData) => {return {...prevData, link:'', role:'', description:''}})
            }

          }
        }}
        options={
          uniqueRoleData?.map((job) => ({
            value: job.role,
            label: job.role,
          })) || []
        }
        placeholder="Select or type to create..."
        required
      />
    </FormTitle>
    )}



    {/* DESCRIPTION */}
    {selectedJob.role && (
    <FormTitle htmlFor="job-description" isRequired={true} text="Paste Job Description" tooltipLabel="The more text the more you use of your tokens. Please try to cut out as much fluff from your job description. The AI is smart enough to reduce the original text from the post to highlight key points to save you tokens on future edits and rerolls.">
      <Textarea
        id="job-description"
        // value={jobDescription}
        placeholder={jobDescriptionPlaceholder}
        // onChange={handleJobDescriptionChange}
      />
    </FormTitle>
    )}


    {/* DELET DRAFTS BUTTON */}
    <Button colorScheme="red" onClick={() => {
      deleteDrafts() 
      setSelectedCompany({id: '',company_name:''})
      setSelectedJob({company_id:'',role:'',link:'',description:''})
      }}
      >
        Del Drafts
      </Button>
  </>
)
}

const jobUrlPlaceholder = `https://www.linkedin.com/jobs/view/3533564818`
const jobDescriptionPlaceholder = `The Job Overview

We are seeking a software developer to join our growing company. You will collaborate with other developers to create and maintain the various software applications we use to streamline our business and increase our efficiency.

Your duties will include developing software for mobile and web platforms to automate our internal processes and make communication seamless between departments.

Responsibilities

Below are some of the responsibilities a software engineer is expected to assume in their position:  

Design, debug, and build software applications
Perform code walk-throughs to ensure code correctness
Work with other engineers to architect, build, and test new features
Participate in code reviews and test designs
Work in an agile environment to release software on a regular schedule
Test software applications and debugging to ensure that they meet business requirements
Troubleshoot existing software and resolve any problems
Work with business analysts to define software development lifecycle requirements
Conduct design reviews to confirm that software architecture is sound
Improve and document existing software and tools
Job Qualifications and Skill Sets

Below are the qualifications expected of a software engineer:

Proficiency in at least one programming language, such as Python, SQL, Java, C#, C++, Ruby, PHP, or JavaScript
Proficiency with data structures, algorithms, and computer science fundamentals
Experience with version control using tools such as Git
Experience with testing tools and computer systems
Experience with build tools and development processes
Proficient communication skills
`

export default JobInfo


    // <FormTitle htmlFor="link" isRequired={true} text="Job Link (URL)" tooltipLabel="Paste a unqiue URL that you haven't used in the paste. There is an error handler to prevent you from making duplicate cover letters for a job. If you do have an exisitng one please edit that.">
    //   <Input type='text' id='link' name='link' value={selectedJob.link} onChange={handleSelectedJobChange} placeholder={jobUrlPlaceholder}/>
    // </FormTitle>
import React from 'react';
import { Input } from '@chakra-ui/react';
import { CreatableSelect } from 'chakra-react-select';
import FormTitle from 'components/FormTitle';
// import { useGetHiringManagersQuery, useCreateHiringManagerMutation } from './fictitiousApi';
import useCustomToast from 'hooks/useCustomToast';
import { useCreateHiringManagerMutation, useGetRolesAndHiringManagerQuery } from 'state/formApi';

const HiringManagerInfo = ({ selectedHiringManager, setSelectedHiringManager,handleHiringManagerChange,selectedJob,selectedCompany, isFormLoading }) => {
  const {data: roleAndHiringManagerData} = useGetRolesAndHiringManagerQuery(selectedCompany.id, { skip: selectedCompany.id === '' })
  const [createHiringManager] = useCreateHiringManagerMutation()
  const customToast = useCustomToast();

  return (
    <>
      <FormTitle htmlFor='name' isRequired={false} text='Hiring Manager Name'>
        <CreatableSelect
          id='name'
          value={
          selectedHiringManager.id
            ? {
                value: selectedHiringManager.id,
                label: selectedHiringManager.name,
              }
            : null
        }
          onChange={(option) => {
            const personData = roleAndHiringManagerData?.hiring_manager.find((person) => {
              return person.id === option.value
            })
            setSelectedHiringManager({id:personData.id, name: personData.hiring_manager,email: personData.email,phone: personData.phone,address: personData.address })
          }}
          onCreateOption={async (newManagerName) => {
            if (!selectedJob.id){
              customToast({
                title: 'Error Need Job Link!',
                description: `Cannot create Hiring Manager without Job Link .`,
                status: 'error',
              });
              return
            }
            
            const res = await createHiringManager({company_id: selectedCompany.id,hiring_manager:newManagerName})

            if (!res.error) {
              customToast({
                title: 'Success!',
                description: `Hiring Manager created.`,
                status: 'success',
              });
              setSelectedHiringManager({ ...selectedHiringManager, id: res.data.id,name: newManagerName });
            } else {
              customToast({
                title: 'Error!',
                description: `Hiring Manager not created. Try again please.`,
                status: 'error',
              });
            }
          }}
          options={
            roleAndHiringManagerData?.hiring_manager.map((manager) => ({
              value: manager.id,
              label: manager.hiring_manager,
            })) || []
          }
          placeholder='Select or type to create...'
          isDisabled={!selectedJob.id || isFormLoading}
        />
      </FormTitle>
    <FormTitle htmlFor="email" isRequired={false} text="Hiring Manager Email">
        <Input
          type="text"
          id="email"
          name="email"
          value={selectedHiringManager.email}
          onChange={handleHiringManagerChange}
          isDisabled={!selectedJob.id || isFormLoading}
        />
      </FormTitle>
      <FormTitle htmlFor="phone" isRequired={false} text="Hiring Manager Phone">
        <Input
          type="text"
          id="phone"
          name="phone"
          value={selectedHiringManager.phone}
          onChange={handleHiringManagerChange}
          isDisabled={!selectedJob.id || isFormLoading}
        />
      </FormTitle>
      <FormTitle htmlFor="address" isRequired={false} text="Hiring Manager Address">
        <Input
          type="text"
          id="address"
          name="address"
          value={selectedHiringManager.address}
          onChange={handleHiringManagerChange}
          isDisabled={!selectedJob.id || isFormLoading}
        />
      </FormTitle>
    </>
  );
};

export default HiringManagerInfo
import React from 'react';
import { Input } from '@chakra-ui/react';
import { CreatableSelect } from 'chakra-react-select';
import FormTitle from 'components/FormTitle';
// import { useGetHiringManagersQuery, useCreateHiringManagerMutation } from './fictitiousApi';
import useCustomToast from 'hooks/useCustomToast';

const HiringManagerInfo = ({ selectedHiringManager, setSelectedHiringManager,handleHiringManagerChange,selectedJob }) => {
//   const { data: hiringManagersData } = useGetHiringManagersQuery();
//   const [createHiringManager] = useCreateHiringManagerMutation();
  const hiringManagersData = []
  const customToast = useCustomToast();

  return (
    <>
      <FormTitle htmlFor='name' isRequired={false} text='Hiring Manager Name'>
        <CreatableSelect
          id='name'
        //   value={selectedHiringManager.name ? { label: selectedHiringManager.name } : null}
          onChange={(option) => setSelectedHiringManager({ ...selectedHiringManager, name: option.label })}
          onCreateOption={async (newManagerName) => {
            if (!selectedJob.id){
              customToast({
                title: 'Error Need Job Link!',
                description: `Cannot create Hiring Manager without Job Link .`,
                status: 'error',
              });
              return
            }
            // const res = await createHiringManager({ name: newManagerName });
            const res = {}

            if (!res.error) {
              customToast({
                title: 'Success!',
                description: `Hiring Manager created.`,
                status: 'success',
              });
              setSelectedHiringManager({ ...selectedHiringManager, name: newManagerName });
            } else {
              customToast({
                title: 'Error!',
                description: `Hiring Manager not created. Try again please.`,
                status: 'error',
              });
            }
          }}
          options={
            hiringManagersData?.map((manager) => ({
              value: manager.name,
              label: manager.name,
            })) || []
          }
          placeholder='Select or type to create...'
          isDisabled={!selectedJob.id}
        />
      </FormTitle>
    <FormTitle htmlFor="email" isRequired={false} text="Hiring Manager Email">
        <Input
          type="text"
          id="email"
          name="email"
          value={selectedHiringManager.email}
          onChange={handleHiringManagerChange}
          isDisabled={!selectedJob.id}
        />
      </FormTitle>
      <FormTitle htmlFor="phone" isRequired={false} text="Hiring Manager Phone">
        <Input
          type="text"
          id="phone"
          name="phone"
          value={selectedHiringManager.phone}
          onChange={handleHiringManagerChange}
          isDisabled={!selectedJob.id}
        />
      </FormTitle>
      <FormTitle htmlFor="address" isRequired={false} text="Hiring Manager Address">
        <Input
          type="text"
          id="address"
          name="address"
          value={selectedHiringManager.address}
          onChange={handleHiringManagerChange}
          isDisabled={!selectedJob.id}
        />
      </FormTitle>
    </>
  );
};

export default HiringManagerInfo
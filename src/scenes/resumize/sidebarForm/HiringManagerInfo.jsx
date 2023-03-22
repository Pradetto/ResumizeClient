import React from 'react'
import { 
    Input,
} from '@chakra-ui/react';
import CreatableSelect from 'react-select/creatable';
import FormTitle from 'components/FormTitle';

const HiringManagerInfo = ({subformData,handleHiringManagerChange,filteredHiringManagers,handleSubformDataChange}) => {
  return (
    <>
        <FormTitle htmlFor="hiring_manager" isRequired={false} text="Hiring Manager">
            <CreatableSelect
            id="hiring-manager"
            // value={
            //   subformData.hiring_manager
            //     ? { label: subformData.hiring_manager }
            //     : null
            // }
            onChange={(option) => handleHiringManagerChange(option)}
            // options={filteredHiringManagers.map((manager) => ({
            //   value: manager.name,
            //   label: manager.name,
            // }))}
            placeholder="Select or type to create..."
            />
        </FormTitle>
        <FormTitle htmlFor="email" isRequired={false} text="Hiring Manager Email">
            <Input
                type="text"
                id="email"
            //   value={subformData.email}
                onChange={(e) => handleSubformDataChange('email', e.target.value)}
            />
        </FormTitle>
        <FormTitle htmlFor="phone" isRequired={false} text="Hiring Manager Phone">
            <Input
                type="text"
                id="phone"
            //   value={subformData.phone}
                onChange={(e) => handleSubformDataChange('phone', e.target.value)}
            />
        </FormTitle>
        <FormTitle htmlFor="address" isRequired={false} text="Hiring Manager Address">
            <Input
                type="text"
                id="address"
            //   value={subformData.address}
                onChange={(e) => handleSubformDataChange('address', e.target.value)}
            />
        </FormTitle>
    </>
)
}

export default HiringManagerInfo
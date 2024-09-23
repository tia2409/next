import React from 'react'

import BasicSelect from '.';

export default {
  title: 'Components/Select/BasicSelect',  
  component: BasicSelect,
};

const Template = args => <BasicSelect {...args} />;

export const BasicSelect_ = Template.bind({});

BasicSelect_.args = {
  name: 'test',
  isSearchable: true, 
  isDisabled: false, 
  isLoading : false,
  isClearable : true,
  isRtl: false, 
};
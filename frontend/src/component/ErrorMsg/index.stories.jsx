import React from 'react'

import ErrorMsg from '.';

export default {
  title: 'Components/Message/ErrorMsg',  
  component: ErrorMsg,
};

const Template = args => <ErrorMsg {...args} />;

export const ErrorMsg_ = Template.bind({});

ErrorMsg_.args = {
  message: 'This is an error message!', 
};
import React from 'react'

import BasicMsg from '.';

export default {
  title: 'Components/Message/BasicMsg',  
  component: BasicMsg,
};

const Template = args => <BasicMsg {...args} />;

export const BasicMsg_ = Template.bind({});

BasicMsg_.args = {
  message: 'This is an basic message!', 
};
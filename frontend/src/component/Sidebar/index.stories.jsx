import React from 'react';
import Sidebar from '.';

export default {
  title: 'Components/Layout',  
  component: Sidebar,
};  

const Template = args => <Sidebar {...args} />;

export const Sidebar_ = Template.bind({});
import React from 'react'

import Header from '.'

export default {
    title: 'Components/Layout/Header',  
    component: Header,
  };  

  const Template = args => <Header {...args} />;

  export const Header_ = Template.bind({});
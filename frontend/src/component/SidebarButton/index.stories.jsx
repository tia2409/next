import React from 'react';
import SidebarButton from '.';

import iconMdc from "./../../../public/images/icons/sidebar_mdc.svg";
import iconTool from "./../../../public/images/icons/sidebar_tool.svg";
import iconAdmin from "./../../../public/images/icons/sidebar_admin.svg";

export default {
  title: 'Components/Button',  
  component: SidebarButton,
  argTypes: {
    iconImage: {
      control: { type: 'select' },
      options: [
        'iconMdc',
        'iconTool',
        'iconAdmin',
      ],
    },
  },
};  

const Template = args => <SidebarButton {...args} />;

export const SidebarButton_ = Template.bind({});

SidebarButton_.args = {
    iconImage: 'iconMdc',
    href: '/iconMdc',
    innerText: 'iconMdc',
    isSidebarOpen: true,
  };
import React from 'react';
import SidebarButton from '.';

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
    innerText: 'IconMdc',
    isSidebarOpen: true,
    isActive: false,
};

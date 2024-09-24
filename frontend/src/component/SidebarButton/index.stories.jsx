import React from "react";
import SidebarButton from ".";

export default {
  title: "Components/Button",
  component: SidebarButton,
  argTypes: {
    iconImage: {
      control: { type: "select" },
      options: ["iconMdc", "iconTool", "iconAdmin"],
    },
  },
};

const Template = (args) => <SidebarButton {...args} />;

export const SidebarButton_ = Template.bind({});

SidebarButton_.args = {
  menu: "iconTotal",
  isSidebarOpen: true,
  isDropMenu: false,
  isActive: false,
  menuDepth: ["icon Main", "icon", "icon1"],
  hrefDepth: ["/main", "/test", "/test1"],
};

import React from "react";
import ToggleButton from ".";

export default {
  title: "Components/Button",
  component: ToggleButton,
};

const Template = (args) => <ToggleButton {...args} />;

export const ToggleButton_ = Template.bind({});

ToggleButton_.args = {
  innerText: "Toggle Button",
  onchange: (isActive) => console.log("Toggle 상태:", isActive),
};

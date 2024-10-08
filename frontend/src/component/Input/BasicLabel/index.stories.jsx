import React from "react";
import BasicLabel from ".";

export default {
  title: "Components/Input/BasicLabel",
  component: BasicLabel,
};

const Template = (args) => <BasicLabel {...args} />;

export const BasicLabel_ = Template.bind({});

BasicLabel_.args = {
  labelTitle: "label title",
  star: true,
};

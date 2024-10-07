import React from "react";
import BasicSelect from ".";

const options = [
  { value: "chocolate", label: "Chocolate" },
  { value: "strawberry", label: "Strawberry" },
  { value: "vanilla", label: "Vanilla" },
];

export default {
  title: "Components/Select/BasicSelect",
  component: BasicSelect,
  argTypes: {
    type: {
      control: { type: "select" },
      options: ["multi", "check", "others"],
    },
  },
};

const Template = (args) => <BasicSelect {...args} />;

export const BasicSelect_ = Template.bind({});

BasicSelect_.args = {
  inputId: "test",
  width: 230,
  placeHolder: "select",
  options,
  Searchable: true,
  Disabled: false,
  type: "multi",
};

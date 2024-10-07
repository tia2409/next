import React from "react";
import BasicMessage from ".";

export default {
  title: "Components/Message/BasicMessage",
  component: BasicMessage,
};

const Template = (args) => <BasicMessage {...args} />;

export const BasicMessage_ = Template.bind({});

BasicMessage_.args = {
  message: "This is an basic message!",
};

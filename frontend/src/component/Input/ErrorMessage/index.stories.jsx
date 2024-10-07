import React from "react";

import ErrorMessage from ".";

export default {
  title: "Components/Message/ErrorMessage",
  component: ErrorMessage,
};

const Template = (args) => <ErrorMessage {...args} />;

export const ErrorMessage_ = Template.bind({});

ErrorMessage_.args = {
  message: "This is an error message!",
};

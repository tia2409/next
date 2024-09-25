import React from "react";

import idIcon from "./../../../public/images/icons/id_input.svg";
import pwIcon from "./../../../public/images/icons/pw_input.svg";
import searchIcon from "./../../../public/images/icons/search_input.svg";
import calendarIcon from "./../../../public/images/icons/calendar_input.svg";

import InputIcon from ".";

export default {
  title: "Components/Input",
  component: InputIcon,
  argTypes: {
    inputImg: {
      control: { type: "select" },
      options: ["pwIcon", "idIcon", "searchIcon", "calendarIcon"],
      mapping: {
        pwIcon: pwIcon,
        idIcon: idIcon,
        searchIcon: searchIcon,
        calendarIcon: calendarIcon,
      },
    },
  },
};

const Template = (args) => <InputIcon {...args} />;

export const InputIcon_ = Template.bind({});

InputIcon_.args = {
  inputImg: "pwIcon",
  placeholder: "placeholder",
  // disable: false,
};

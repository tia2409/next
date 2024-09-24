import React from "react";

import idIcon from "./../../../public/images/icons/id_input.svg";
import pwIcon from "./../../../public/images/icons/pw_input.svg";
import searchIcon from "./../../../public/images/icons/search_input.svg";
import calendarIcon from "./../../../public/images/icons/calendar_input.svg";

import IconButton from ".";

export default {
  title: 'Components/Button',
  component: IconButton,
  argTypes: {
    inputType: {
      control: { type: 'select' },
      options: ['password', 'text'],
    },
    inputImg: {
      control: { type: 'select' },
      options: [
        'pwIcon',
        'idIcon',
        'searchIcon',
        'calendarIcon',
      ],
      mapping: {
        pwIcon: pwIcon,
        idIcon: idIcon,
        searchIcon: searchIcon,
        calendarIcon: calendarIcon,
      },
    },
  },
};

const Template = args => <IconButton {...args} />;

export const IconButton_ = Template.bind({});

IconButton_.args = {
  inputType: 'password',
  inputImg: 'pwIcon',
  placeholder: 'placeholder',
  // disable: false,
};
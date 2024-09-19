import React, { useState } from "react";
import Image from "next/image";

import invisible from "./../../../public/images/icons/icon_invisible.svg";
import visible from "./../../../public/images/icons/icon_visible.svg";

import idIcon from "./../../../public/images/icons/id_input.svg";
import pwIcon from "./../../../public/images/icons/pw_input.svg";
import searchIcon from "./../../../public/images/icons/search_input.svg";
import calendarIcon from "./../../../public/images/icons/calendar_input.svg";

import IconInput from ".";

export default {
  title: 'Components/Input',
  component: IconInput,
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

const Template = args => <IconInput {...args} />;

export const IconInput_ = Template.bind({});

IconInput_.args = {
  inputType: 'password',
  inputImg: 'pwIcon',
  placeholder: 'placeholder',
  // disable: false,
};
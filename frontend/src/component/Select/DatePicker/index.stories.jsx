import React from "react";
import DateSelect from ".";
import "react-datepicker/dist/react-datepicker.css";
import "./index.module.css";
import "./../../../styles/picker.css";

export default {
  title: "Components/Select/DateSelect",
  component: DateSelect,
  decorators: [
    (Story) => (
      <div style={{ padding: "100px" }}>
        <Story />
      </div>
    ),
  ],
};

const Template = (args) => <DateSelect {...args} />;

export const DateSelect_ = Template.bind({});

DateSelect_.args = {
  startDate: new Date("2023-01-01"),
  endDate: new Date("2024-12-31"),
  onchange: (date) => console.log("Selected date:", date),
};

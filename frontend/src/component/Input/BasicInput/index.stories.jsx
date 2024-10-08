import BasicInput from ".";
import sampleIcon from "./../../../../public/images/icons/input/user.svg";

export default {
  title: "Components/Input/BasicInput",
  component: BasicInput,
  argTypes: {
    inputType: {
      control: { type: "select" },
      options: ["text", "password"],
    },
  },
};

const Template = (args) => <BasicInput {...args} />;

export const BasicInput_ = Template.bind({});

BasicInput_.args = {
  width: "360",
  height: "34",
  inputType: "text",
  leftIcon: false,
  rightIcon: false,
  inputImg: sampleIcon,
  placeholder: "BasicInput",
  disabled: false,
  value: "",
};

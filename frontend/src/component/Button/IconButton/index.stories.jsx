import IconButton from ".";
import sampleIcon from "./../../../../public/images/icons/button/company.svg";

export default {
  title: "Components/Button/IconButton",
  component: IconButton,
};

const Template = (args) => <IconButton {...args} />;

export const IconButton_ = Template.bind({});

IconButton_.args = {
  width: "120",
  height: "34",
  leftIcon: false,
  rightIcon: false,
  buttonImg: sampleIcon,
  innerText: "IconButton",
};

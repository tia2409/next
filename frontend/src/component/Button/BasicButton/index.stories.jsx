import BasicButton from ".";

export default {
  title: "Components/Button/BasicButton",
  component: BasicButton,
};

const Template = (args) => <BasicButton {...args} />;

export const BasicButton_ = Template.bind({});

BasicButton_.args = {
  width: "360",
  border: false,
  round: false,
  innerText: "BasicButton",
};

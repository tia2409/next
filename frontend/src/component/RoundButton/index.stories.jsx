import RoundButton from ".";

export default {
    title: 'Components/Button/RoundButton',  
    component: RoundButton,
};

const Template = args => <RoundButton {...args} />;

export const RoundButton_ = Template.bind({});

RoundButton_.args = {
    innerText: 'RoundButton', 
};
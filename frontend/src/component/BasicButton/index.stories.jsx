import BasicButton from ".";

export default {
    title: 'Components/Button/BasicButton',  
    component: BasicButton,
};

const Template = args => <BasicButton {...args} />;

export const BasicButton_ = Template.bind({});

BasicButton_.args = {
    width : '360px',
    border : 'none',
    text : 'white',
    background : 'main02',
    innerText: 'BasicButton', 
};
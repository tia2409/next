import LocaleSelect from ".";

export default {
  title: "Components/Select/LocaleSelect",
  component: LocaleSelect,
  decorators: [
    (Story) => (
      <div style={{ padding: "100px" }}>
        <Story />
      </div>
    ),
  ],
};

const Template = (args) => <LocaleSelect {...args} />;

export const LocaleSelect_ = Template.bind({});

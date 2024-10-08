import PopUp from ".";

export default {
  title: "Components/Modal/PopUp",
  component: PopUp,
  argTypes: {
    data: {
      control: {
        type: "object",
      },
    },
    title: {
      control: { type: "text" },
    },
    content: {
      control: { type: "text" },
    },
  },
  decorators: [
    (Story) => (
      <div style={{ padding: "100px", display: "flex", gap: "20px" }}>
        <Story />
      </div>
    ),
  ],
};

const Template = (args) => {
  const { title, content, ...rest } = args;
  const data = {
    title: title,
    content: content,
  };

  return <PopUp {...rest} data={data} />;
};

export const PopUp_ = Template.bind({});

PopUp_.args = {
  isPopUpOpen: true,
  togglePopUp: () => console.log("PopUp toggled!"),
  title: "Title",
  content: "PopUp content 들어갈 영역",
};

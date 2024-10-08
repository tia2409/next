import Modal from ".";

export default {
  title: "Components/Modal/Modal",
  component: Modal,
  argTypes: {
    modalType: {
      control: { type: "select" },
      options: ["confirm", "alert"],
    },
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
    caution: {
      control: {
        type: "select",
      },
      options: [null, "※ 주의사항"],
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
  // caution 값을 args로부터 받아서 data 객체를 동적으로 생성
  const { caution, title, content, ...rest } = args;
  const data = {
    title: title,
    content: content,
    caution: caution,
  };

  return <Modal {...rest} data={data} />;
};

export const Modal_ = Template.bind({});

Modal_.args = {
  isModalOpen: true,
  toggleModal: () => alert("Modal toggled"),
  title: "모달 제목",
  content: "모달 내용",
  caution: null,
  modalType: "alert",
};

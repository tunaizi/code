import * as React from "react";
import { Button, Modal, Form, Input, Space, message } from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import type { FormInstance } from "antd";
const AboutPage = () => {
  const [isModalOpen, setIsModalOpen] = React.useState<boolean>(false);
  const formRefName = React.useRef<any>();
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    const { validateFields }: FormInstance = formRefName.current;
    validateFields()
      .then(values => {
        console.log(values);
        setIsModalOpen(false);
        message.success("Submit success!");
      })
      .catch(error => {
        console.log(error);
        message.error("Submit error!");
      });
  };

  const handleCancel = () => {
    const { resetFields }: FormInstance = formRefName.current;
    setIsModalOpen(false);
    resetFields();
  };
  return (
    <>
      <Button type="primary" onClick={showModal}>
        Open Modal
      </Button>
      <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <Form ref={formRefName} name="dynamic_form_nest_item" autoComplete="off">
          <Form.List name="users">
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, ...restField }) => (
                  <Space key={key} style={{ display: "flex", marginBottom: 8 }} align="baseline">
                    <Form.Item
                      {...restField}
                      name={[name, "first"]}
                      rules={[{ required: true, message: "Missing first name" }]}
                    >
                      <Input placeholder="First NameFirst NameFirst NameFirst NameFirst NameFirst Name" />
                    </Form.Item>
                    <Form.Item
                      {...restField}
                      name={[name, "last"]}
                      rules={[{ required: true, message: "Missing last name" }]}
                    >
                      <Input placeholder="Last Name" />
                    </Form.Item>
                    <MinusCircleOutlined onClick={() => remove(name)} />
                  </Space>
                ))}
                <Form.Item>
                  <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                    Add field
                  </Button>
                </Form.Item>
              </>
            )}
          </Form.List>
        </Form>
      </Modal>
    </>
  )
};

export default AboutPage;

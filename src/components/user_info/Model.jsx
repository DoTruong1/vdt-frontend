import { useState } from 'react'
import { Modal, Form, Input, Tooltip } from 'antd'
import { EditOutlined } from '@ant-design/icons';
function UserInfoModal(props) {

  const [modalConfirmLoading, setModalConfirmLoading] = useState(false);

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const handleOk = async () => {
    let respone;
    setModalConfirmLoading(true);
    try {
      if (props.modalFunc.modalMetada.isAdd) {
        respone = await props.curdFunction.addUser()
      } else {
        respone = await props.curdFunction.updateUser()
      }
      setModalConfirmLoading(false);
      props.modalFunc.setModalMetadata({
        ...props.modalFunc.modalMetada,
        isOpen: false,
        isEditable: true,
        data: {}
      })
    } catch (error) {
      console.log(error)
    }
  };
  const handleCancel = () => {
    console.log('Clicked cancel button');
    props.modalFunc.setModalMetadata({
      isOpen: false,
      isEditable: true,
      data: {}
    })
    // props.setOpenModal(false);
  };
  return (
    <>
      <Modal
        title={<>
          <p>Thông tin thí sinh <> </>
            <Tooltip title="Bấm để chỉnh sửa thông tin"
              style={{
                cursor: "pointer"
              }}
            >
              {<EditOutlined
                style={{
                  borderLeft: '2px',
                  color: "blue",
                  cursor: "pointer"
                }}
                onClick={(e) => { props.modalFunc.setModalMetadata({ ...props.modalFunc.modalMetada, isEditable: true }) }}
              />}
            </Tooltip>
          </p>
        </>}
        open={props.modalFunc.modalMetada.isOpen}
        onOk={handleOk}
        confirmLoading={modalConfirmLoading}
        onCancel={handleCancel}
        okText={props.modalFunc.modalMetada.isAdd ? "Thêm thí sinh" : "Cập nhật"}
        okButtonProps={{ disabled: props.modalFunc.modalMetada.disableSubmit }}
      >
        <Form
          form={props.form}
          name="basic"
          disabled={!props.modalFunc.modalMetada.isEditable}
          onFinish={setModalConfirmLoading}
          onFinishFailed={onFinishFailed}
        // onFieldsChange={props.handleFormChange}

        >
          <Form.Item name="id">
            <Input type="hidden" />
          </Form.Item>
          <Form.Item
            label="Họ và tên (*)"
            name="name"
            rules={[
              {
                required: true,
                message: 'Vui lòng điền đủ thông tin!',
              },
            ]}
            validateFirst
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Trường (*):"
            name="school"
            rules={[
              {
                required: true,
                message: 'Vui lòng điền đủ thông tin!',
              },
            ]}
            validateFirst
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Giới tính (*):"
            name="gender"
            rules={[
              {
                required: true,
                message: 'Vui lòng điền đủ thông tin!',
              },
            ]}
            validateFirst
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal >
    </>
  )
}

export default UserInfoModal
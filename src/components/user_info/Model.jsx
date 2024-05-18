import { useEffect, useState } from 'react'
import { Modal, Form, Input, Flex, Button, Col, Row, Tooltip } from 'antd'
import { EditOutlined } from '@ant-design/icons';
function UserInfoModal(props) {
  const [userInfo, setUserInfo] = useState(props.userInfo)
  const [modalConfirmLoading, setModalConfirmLoading] = useState(false);
  const [isEditing, setisEditing] = useState(false)

  // useEffect(() => {
  //   console.log(userInfo)

  // }, [userInfo])
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const handleOk = () => {
    // setModalData(currVdterId)
    setModalConfirmLoading(true);
    setTimeout(() => {
      props.setOpenModal(false);
      setModalConfirmLoading(false);
    }, 2000);
  };
  const handleCancel = () => {
    console.log('Clicked cancel button');
    props.setOpenModal(false);
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
                onClick={(e) => { setisEditing(!isEditing) }}
              />}
            </Tooltip>
          </p>
        </>}
        open={props.openModal}
        onOk={handleOk}
        confirmLoading={modalConfirmLoading}
        onCancel={handleCancel}
      >
        <Form
          form={props.form}
          name="basic"
          disabled={!isEditing}
          onFinish={setModalConfirmLoading}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            label="Họ và tên"
            name="name"
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Trường:"
            name="school"
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Giới tính:"
            name="gender"
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal >
    </>
  )
}

export default UserInfoModal
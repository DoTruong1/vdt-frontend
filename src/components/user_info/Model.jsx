import { useState } from 'react'
import { Modal, Form, Input, Tooltip, Select, Space, DatePicker } from 'antd'
import { EditOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
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
        width={"600px"}
        title={<>
          <p>Thông tin thí sinh <> </>
            {!props.modalFunc.modalMetada.isAdd ? (<Tooltip title="Bấm để chỉnh sửa thông tin"
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
            </Tooltip>) : (<></>)}
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
          variant='outlined'
          form={props.form}
          name="basic"
          disabled={!props.modalFunc.modalMetada.isEditable}
          onFinish={setModalConfirmLoading}
          onFinishFailed={onFinishFailed}
        // onFieldsChange={props.handleFormChange}

        >

          <Form.Item
            label="Họ và tên"
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
            label="Trường"
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
          <Space size={"middle"}>
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
              <Select

                style={{ width: 80 }}
                options={[
                  { value: 'Nam', label: 'Nam' },
                  { value: 'Nữ', label: 'Nữ' },
                ]}
              />
            </Form.Item>
            <Form.Item
              label="Số điện thoại:"
              name="phone"
              rules={[
                {
                  required: true,
                  // type: "regexp",
                  pattern: new RegExp(/\d+/g),
                  message: 'Vui lòng điền đúng định dạng!',
                },
              ]}
              validateFirst
            >
              <Input />
            </Form.Item>
          </Space>
          <Space size={"middle"}>
            <Form.Item
              label="Quốc tịch:"
              name="nation"
              rules={[
                {
                  required: true,
                  message: 'Vui lòng điền đủ thông tin!',
                },
              ]}
              validateFirst
            >
              <Input style={{ width: "120px" }}
              />
            </Form.Item>
            <Form.Item
              label="Email:"
              name="email"
              rules={[
                {
                  required: false,
                  // message: 'Vui lòng điền đủ thông tin!',
                },
              ]}
            // validateFirst
            >
              <Input style={{ width: "250px" }} />
            </Form.Item>
          </Space>
          <Form.Item
            label="Sinh nhật:"
            name="birthDay"
            // getValueProps={(i) => dayjs(i.toString(), 'DD-MM-YYYY')}
            // initialValue={dayjs()}
            rules={[
              {
                required: true,
                message: 'Vui lòng ngày sinh!',
              },
            ]}
          >
            <DatePicker
              format={{
                format: 'YYYY',
                type: 'mask',
              }} picker='year' />
          </Form.Item>
          <Form.Item name="id">
            <Input type="hidden" />
          </Form.Item>
        </Form>
      </Modal >
    </>
  )
}

export default UserInfoModal
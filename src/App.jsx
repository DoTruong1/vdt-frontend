import { useEffect, useState } from "react";
import dayjs from "dayjs";
import moment from "moment";
import {
  getByIdApi,
  deleteAPI,
  updateAPI,
  getAllApi,
  addAPI,
} from "../helpers/api.helper";
import { Table, Space, Tooltip, Form, Popconfirm, notification } from "antd";
import { UserAddOutlined } from "@ant-design/icons";
import UserInfoModal from "./components/user_info/Model";
import UserTable from "./components/user_table/UserTable";
import { Typography } from "antd";
import "./App.css";
const { Title } = Typography;

function CustomRow(props) {
  return (
    <Tooltip title="Bấm để xem thông tin chi tiết">
      <tr onClick={props.onClick} {...props} />
    </Tooltip>
  );
}



function App() {
  const API_PATH = "/users";
  const [api, contextHolder] = notification.useNotification();
  // let userInfo = {}
  const [form] = Form.useForm();
  const formValues = Form.useWatch([], form);

  const [modalMetada, setModalMetadata] = useState({
    data: {},
    isOpen: false,
    isEditable: true,
    isAdd: false,
    disableSubmit: true
  });
  const [userInfo, setUserInfo] = useState({});
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const showModal = () => setOpenModal(true);


  const openNotificationWithIcon = (type, message, des) => {
    api[type]({
      message: message,
      description:
        des,
      duration: 1,
    });
  };


  const curdFunction = {
    fetchUserInfo: async (userId) => {
      try {
        const respone = await getByIdApi(API_PATH, userId);
        let date = moment(new Date(respone.data.birthDay ? respone.data.birthDay : "1975"), "YYYY")
        let userInfo = { ...respone.data, birthDay: date }
        // console.log(userInfo)
        // user.birthDay = formatedBirthDay
        // console.log(user.birthDay)
        form.setFieldsValue(userInfo);
        setModalMetadata({
          isEditable: false,
          isAdd: false,
          data: userInfo,
          isOpen: true,
          disableSubmit: true
        });
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    },

    deleteUser: async (userId) => {
      try {
        // console.log(form.getFieldsValue())
        // const user = form.getFieldsValue()
        console.log("calling delete api")
        const respone = await deleteAPI(API_PATH, userId)
        if (respone.status === 200) {
          curdFunction.fetchUsers()
          openNotificationWithIcon('success', "Cập nhật thông tin thành công", '')
        } else {
          openNotificationWithIcon('error', "Có lỗi khi cập nhật thông tin", '')
        }

      } catch (error) {
        console.error(error)
      }
    },

    updateUser: async () => {
      try {
        // console.log(form.getFieldsValue())
        const user = form.getFieldsValue()
        console.log(user)
        await updateAPI(API_PATH, user.id, user).then((respone) => {
          if (respone.status === 200) {
            curdFunction.fetchUsers()
            openNotificationWithIcon('success', "Cập nhật thông tin thành công", '')
          } else {
            openNotificationWithIcon('error', "Có lỗi khi cập nhật thông tin", '')
          }
          return respone
        })

      } catch (error) {
        console.error(error)
      }
    },

    addUser: async () => {
      try {
        // console.log(form.getFieldsValue())
        const user = form.getFieldsValue()
        const respone = await addAPI(API_PATH, user)
        if (respone.status === 200) {
          curdFunction.fetchUsers()
          openNotificationWithIcon('success', "Cập nhật thông tin thành công", '')
        } else {
          openNotificationWithIcon('error', "Có lỗi khi cập nhật thông tin", '')
        }
      } catch (error) {
        console.error(error)
      }
    },
    // const [ser]/

    fetchUsers: async () => {
      try {
        const respone = await getAllApi(API_PATH);
        if (respone.status === 200) {
          setUsers(respone.data);
          openNotificationWithIcon('success', "Lấy dữ liệu thành công", '')
        } else {
          openNotificationWithIcon('error', "Có lỗi khi lấy dữ liệu", '')
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);

      }
    }

  }

  useEffect(() => {
    curdFunction.fetchUsers();

    console.log('i fire once');
  }, []);

  useEffect(() => {
    form
      .validateFields({
        validateOnly: true,
      })
      .then(() => setModalMetadata({
        ...modalMetada,
        disableSubmit: false
      }))
      .catch(() => setModalMetadata({
        ...modalMetada,
        disableSubmit: true
      }));
  }, [form, formValues]);

  return (
    <>
      {contextHolder}

      <UserInfoModal
        modalFunc={{ modalMetada, setModalMetadata }}
        modalMetada={modalMetada}
        setModalMetadata={setModalMetadata}
        userInfo={userInfo}
        form={form}
        curdFunction={curdFunction}
      />
      <div>
        <Title level={4}
          style={{
            margin: 4,
            float: 'left'
          }}
        >Thí sinh vdt 2024
          <>
            <span>&nbsp;</span>
            <Tooltip placement="topLeft" title={"Bấm để thêm thí sinh"}>
              <UserAddOutlined style={{
                color: 'blue',
                fontSize: '80%',
                cursor: "pointer"
              }}

                onClick={(e) => {
                  form.setFieldsValue({
                    name: '',
                    school: '',
                    gender: '',
                    email: '',
                    birthDay: '',
                    nation: '',
                    phone: ''
                  });
                  setModalMetadata({
                    isEditable: true,
                    isAdd: true,
                    data: {},
                    isOpen: true,
                    disableSubmit: true
                  });
                  // props.fetchUserInfo(record.id);
                }} />
            </Tooltip >

          </> </Title>
      </div>
      <UserTable
        curdFunction={curdFunction}
        users={users}
        form={form}
      />
    </>
  );
}

export default App;

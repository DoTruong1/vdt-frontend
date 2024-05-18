import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { getAllData } from '../helpers/api.helper'
import { Table, Space, Tooltip, Form, Popconfirm } from 'antd'
import UserInfoModal from './components/user_info/Model'
import UserTable from './components/user_table/UserTable'
import './App.css'

function CustomRow(props) {
  return (
    <Tooltip title="Bấm để xem thông tin chi tiết">
      <tr onClick={props.onClick} {...props} />
    </Tooltip>
  );
}

function App() {
  // let userInfo = {}
  const [form] = Form.useForm();
  const API_URL = import.meta.env.APP_API_URL
  const [openModal, setOpenModal] = useState(false);
  const [userInfo, setUserInfo] = useState({})
  const [modalConfirmLoading, setModalConfirmLoading] = useState(false);
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)


  const showModal = () => setOpenModal(true);

  const deleteUser = (id) => {
    console.log("delete " + id)
  }

  // const [ser]/

  const fetchUsers = async () => {
    try {
      const usersData = await getAllData(API_URL + "vdters2024");
      setUsers(usersData);
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }
  useEffect(() => {
    fetchUsers()
  }, [])

  // mở modal sau khi update userinfo
  useEffect(() => {
    const convertObjectToArr = Object.values(userInfo)
    const isUserInfoBlanlk = convertObjectToArr.length === 0
    if (!isUserInfoBlanlk) {
      form.setFieldsValue(userInfo)
      showModal()
    }
  }, [userInfo])
  return (
    <>

      <UserInfoModal
        setOpenModal={setOpenModal}
        openModal={openModal}
        userInfo={userInfo}
        form={form}
      />
      <UserTable
        setUserInfo={setUserInfo}
        users={users}
        deleteUser={deleteUser}
      />
      {/* <Table columns={columns}
        dataSource={users}

      /> */}
    </>
  )
}

export default App

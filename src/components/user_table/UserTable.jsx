import { Popconfirm, Tooltip, Space, Table } from "antd";


function UserTable(props) {
  // console.log(props.users)
  const columns = [
    {
      title: "Họ và tên",
      dataIndex: 'name',
      key: 'id',
      render: (_, record) => (
        <Tooltip placement="topLeft" title={"Bấm để xem thông tin chi tiết"}>
          <a onClick={(e) => {
            const user = props.users.find(row => row.id === record.id)

            props.setUserInfo(user)
          }}> {record.name}</a>
        </Tooltip >
      )

    },
    {
      title: 'Học trường',
      dataIndex: 'school',
      key: 'id',
    },
    {
      title: 'Giới tính',
      dataIndex: 'gender',
      key: 'id',
    },
    {
      title: 'Thao tác',
      key: 'id',
      render: (_, record) => (
        <Space size="middle">
          {/* <a>Chỉnh sửa</a> */}
          <Popconfirm title="Bạn có muốn xoá?"
            onConfirm={() => props.deleteUser(record.id)}
            okText="Có, tôi muốn xoá"
            cancelText="Huỷ"
          >
            <a>Xoá</a>
          </Popconfirm>

        </Space >
      ),
    },
  ];
  return (<>
    <Table columns={columns}
      dataSource={props.users}
      rowKey={"id"}

    />
  </>)
}

export default UserTable;
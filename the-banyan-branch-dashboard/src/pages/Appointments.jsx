import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Table, Card } from "antd";
import { getAppointments } from "../redux/slice/BookSlice";
import { boookSelector } from "../redux/selector/selectors";
import CardTitle from "../components/CardTitle";

const Appointments = () => {
  const dispatch = useDispatch();
  const [sort, setSort] = useState("asc");
  const { bookData, bookLoading } = useSelector(boookSelector);
  console.log("bookData: ", bookData);

  useEffect(() => {
    dispatch(getAppointments(sort));
  }, [dispatch, sort]);

  const handleTableChange = (pagination, filters, sorter) => {
    if (sorter.order === "ascend") {
      setSort("asc");
    } else if (sorter.order === "descend") {
      setSort("desc");
    } else {
      setSort("asc");
    }
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      sorter: true,
    },
  ];

  return (
    <Card title={<CardTitle title="Appointments" />} className="w-full">
      <Table
        columns={columns}
        dataSource={bookData?.results}
        rowKey="id"
        loading={bookLoading}
        pagination={{
          pageSize: 10,
          showSizeChanger: true,
          showQuickJumper: true,
          showTotal: (total) => `Total ${total} appointments`,
        }}
        scroll={{ x: 750 }}
        onChange={handleTableChange}
      />
    </Card>
  );
};

export default Appointments;

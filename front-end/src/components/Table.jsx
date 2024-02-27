import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { findAll } from "../services/users.service";
import BlockModal from "./BlockModal";
import DeleteModal from "./DeleteModal";
import EditForm from "./EditForm";

export default function Table({ searchKey }) {
  const [deleteModal, setDeleteModal] = useState(false);
  const [blockModal, setBlockModal] = useState(false);
  const [editForm, setEditForm] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  // lấy dữ liệu từ api
  const dispatch = useDispatch();
  const loadData = () => {
    dispatch(findAll());
  };
  useEffect(() => {
    loadData();
  }, []);
  const listUser = useSelector((state) => state.user.data);
  // lấy id nút block
  const handleBlock = (id) => {
    setBlockModal(true);
    setSelectedId(id);
  };

  //lấy id nút xóa
  const handleDelete = (id) => {
    setDeleteModal(true);
    setSelectedId(id);
  };

  // lấy id nút edit
  const handleEdit = (id) => {
    setEditForm(true);
    setSelectedId(id);
  };

  // hàm hiển thị dữ liệu tìm kiếm
  const searchData = listUser.filter((user) =>
    user.email.toLowerCase().includes(searchKey.toLowerCase())
  );
  console.log(searchData);
  return (
    <>
      <table className="table table-bordered table-hover table-striped">
        <thead>
          <tr>
            <th>STT</th>
            <th>Họ và tên</th>
            <th>Ngày sinh</th>
            <th>Email</th>
            <th>Địa chỉ</th>
            <th>Trạng thái</th>
            <th colSpan={2}>Chức năng</th>
          </tr>
        </thead>
        <tbody>
          {searchData.map((item, index) => (
            <tr key={item.id}>
              <td>{index + 1}</td>
              <td>{item.userName}</td>
              <td>{item.dateOfBirth}</td>
              <td>{item.email}</td>
              <td>{item.address}</td>
              <td>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  {item.status == 1 ? (
                    <>
                      {" "}
                      <div className="status status-active" />
                      <span> Đang hoạt động</span>
                    </>
                  ) : (
                    <>
                      {" "}
                      <div className="status status-stop" />
                      <span> Ngừng hoạt động</span>
                    </>
                  )}
                </div>
              </td>
              <td>
                <span
                  className="button button-block"
                  onClick={() => handleBlock(item.id)}
                >
                  {item.status == 1 ? "Chặn" : "Bỏ chặn"}
                </span>
              </td>
              <td>
                <span
                  className="button button-edit"
                  onClick={() => handleEdit(item.id)}
                >
                  Sửa
                </span>
              </td>
              <td>
                <span
                  className="button button-delete"
                  onClick={() => handleDelete(item.id)}
                >
                  Xóa
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Modal xác nhận chặn tài khoản */}
      {blockModal && (
        <BlockModal setBlockModal={setBlockModal} userBlockId={selectedId} />
      )}
      {/* Modal xác nhận xóa tài khoản */}
      {deleteModal && (
        <DeleteModal
          setDeleteModal={setDeleteModal}
          userDeleteId={selectedId}
        />
      )}
      {editForm && (
        <EditForm setEditForm={setEditForm} userEditId={selectedId} />
      )}
    </>
  );
}

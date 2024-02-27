import React from "react";
import { useDispatch } from "react-redux";
import { remove } from "../services/users.service";

export default function DeleteModal({ setDeleteModal, userDeleteId }) {
  const dispatch = useDispatch();
  const handleDelete = () => {
    dispatch(remove(userDeleteId));
    setDeleteModal(false);
  };
  return (
    <>
      <div className="overlay" hidden="">
        <div className="modal-custom">
          <div className="modal-title">
            <h4>Cảnh báo</h4>
            <i
              className="fa-solid fa-xmark"
              onClick={() => setDeleteModal(false)}
            />
          </div>
          <div className="modal-body-custom">
            <span>Bạn có chắc chắn muốn xóa tài khoản này?</span>
          </div>
          <div className="modal-footer-custom">
            <button
              className="btn btn-light"
              onClick={() => setDeleteModal(false)}
            >
              Hủy
            </button>
            <button className="btn btn-danger" onClick={handleDelete}>
              Xác nhận
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

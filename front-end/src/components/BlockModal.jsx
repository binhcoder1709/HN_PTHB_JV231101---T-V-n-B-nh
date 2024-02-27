import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { findOne, patch } from "../services/users.service";

export default function BlockModal({ setBlockModal, userBlockId }) {
  const dispatch = useDispatch();
  // hàm block user
  const handleBlock = () => {
    dispatch(patch({ id: userBlockId, statusId: { status: 0 } }));
    setBlockModal(false);
  };

  // hàm mở block user
  const handleUnBlock = () => {
    dispatch(patch({ id: userBlockId, statusId: { status: 1 } }));
    setBlockModal(false);
  };

  // tìm kiếm user theo id
  const loadUser = () => {
    dispatch(findOne(userBlockId));
  };
  useEffect(() => {
    loadUser();
  }, []);
  
  // lấy status của user
  const statusUser = useSelector((state) => state.user.userEdit);
  return (
    <>
      <div className="overlay" hidden="">
        <div className="modal-custom">
          <div className="modal-title">
            <h4>Cảnh báo</h4>
            <i
              className="fa-solid fa-xmark"
              onClick={() => setBlockModal(false)}
            />
          </div>
          <div className="modal-body-custom">
            <span>
              Bạn có chắc chắn muốn{" "}
              {statusUser?.status == 1 ? "chặn" : "bỏ chặn"} tài khoản này?
            </span>
          </div>
          <div className="modal-footer-custom">
            <button
              className="btn btn-light"
              onClick={() => setBlockModal(false)}
            >
              Hủy
            </button>
            {statusUser?.status == 1 ? (
              <button className="btn btn-danger" onClick={handleBlock}>
                Xác nhận
              </button>
            ) : (
              <button className="btn btn-danger" onClick={handleUnBlock}>
                Xác nhận
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

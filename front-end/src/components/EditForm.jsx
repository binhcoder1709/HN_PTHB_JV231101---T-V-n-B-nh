import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { findOne } from "../services/users.service";
import { useFormik } from "formik";
import * as Yup from "yup";

export default function EditForm({ setEditForm, userEditId }) {
  const dispatch = useDispatch();
  // lấy dữ liệu của user theo id
  const loadUser = () => {
    dispatch(findOne(userEditId));
  };
  useEffect(() => {
    loadUser();
  }, []);
  const userData = useSelector((state) => state.user.userEdit);
  const formik = useFormik({
    initialValues: {
      userName: userData?.userName || "",
      email: userData?.email || "",
      dateOfBirth: userData?.dateOfBirth || "",
      address: userData?.address || "",
    },
    validationSchema: Yup.object({
      userName: Yup.string().required("Vui lòng nhập tên"),
      email: Yup.string()
        .email("Email không hợp lệ")
        .required("Vui lòng nhập email"),
      address: Yup.string().required("Vui lòng nhập địa chỉ"),
      dateOfBirth: Yup.date()
        .required("Vui lòng nhập ngày sinh")
        .max(new Date(), "Ngày sinh không hợp lệ"),
    }),
    onSubmit: async (values) => {
      // đẩy dữ liệu lên api
      
    },
  });
  return (
    <>
      <div className="overlay" hidden="">
        <form className="form" onSubmit={formik.handleSubmit}>
          <div className="d-flex justify-content-between align-items-center">
            <h4>Thêm mới nhân viên</h4>
            <i
              className="fa-solid fa-xmark"
              onClick={() => setEditForm(false)}
            />
          </div>
          <div>
            <label className="form-label" htmlFor="userName">
              Họ và tên
            </label>
            <input
              id="userName"
              type="text"
              className="form-control"
              name="userName"
              onChange={formik.handleChange}
              value={formik.values.userName}
            />
          </div>
          <div>
            <label className="form-label" htmlFor="dateOfBirth">
              Ngày sinh
            </label>
            <input
              id="dateOfBirth"
              type="date"
              className="form-control"
              name="dateOfBirth"
              onChange={formik.handleChange}
              value={formik.values.dateOfBirth}
            />
          </div>
          <div>
            <label className="form-label" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              type="email"
              className="form-control"
              name="email"
              onChange={formik.handleChange}
              value={formik.values.email}
            />
          </div>
          <div>
            <label className="form-label" htmlFor="address">
              Địa chỉ
            </label>
            <textarea
              className="form-control"
              id="address"
              rows={3}
              defaultValue={""}
              name="address"
              onChange={formik.handleChange}
              value={formik.values.address}
            />
          </div>
          <div>
            <button className="w-100 btn btn-primary">Thêm mới</button>
          </div>
        </form>
      </div>
    </>
  );
}

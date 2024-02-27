import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { createAccount } from "../services/users.service";
import { formatDate } from "../utils/common";

export default function Form({ setDisplayForm }) {
  // hàm dispatch
  const dispatch = useDispatch();
  // validate form sử dụng formik và yup
  const formik = useFormik({
    initialValues: {
      userName: "",
      email: "",
      dateOfBirth: "",
      address: "",
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
      const user = {
        userName: values.userName,
        dateOfBirth: values.dateOfBirth,
        email: values.email,
        address: values.address,
        status: 1,
        createdAt: formatDate(),
      };
      dispatch(createAccount(user));
      setDisplayForm(false);
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
              onClick={() => setDisplayForm(false)}
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
            {formik.touched.userName && formik.errors.userName ? (
              <div className="form-text error">{formik.errors.userName}</div>
            ) : null}
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
          {formik.touched.dateOfBirth && formik.errors.dateOfBirth ? (
            <div className="form-text error">{formik.errors.dateOfBirth}</div>
          ) : null}
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
          {formik.touched.email && formik.errors.email ? (
            <div className="form-text error">{formik.errors.email}</div>
          ) : null}
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

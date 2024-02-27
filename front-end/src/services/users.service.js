import { createAsyncThunk } from "@reduxjs/toolkit";
import baseUrl from "../api/axios";

//hàm tạo user
export const createAccount = createAsyncThunk(
  "user/create",
  async (userData) => {
    try {
      const response = await baseUrl.post("users", userData);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

//hàm tìm kiếm tất cả user
export const findAll = createAsyncThunk("user/findAll", async () => {
  try {
    const response = await baseUrl.get("users");
    console.log(response);
    return response.data;
  } catch (error) {
    console.log(error);
  }
});

//hàm xóa 1 bản ghi theo id
export const remove = createAsyncThunk("user/remove", async (id) => {
  try {
    let response = await baseUrl.delete(`users/${id}`);
    return response;
  } catch (error) {
    console.log(error);
  }
});

// hàm patch 1 bản ghi theo id
export const patch = createAsyncThunk(
  "user/patch",
  async ({ id, statusId }) => {
    try {
      let response = await baseUrl.patch(`users/${id}`, statusId);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

// hàm tìm kiếm 1 bản ghi theo id
export const findOne = createAsyncThunk("user/findOne", async (id) => {
  try {
    let response = await baseUrl.get(`users/${id}`);

    return response.data;
  } catch (error) {
    console.log(error);
  }
});

// hàm put bản ghi theo id
export const put = createAsyncThunk("user/put", async ({id, dataUpdate}) => {
  try {
    let response = await baseUrl.put(`users/${id}`, dataUpdate);
    return response.data;
  } catch (error) {
    console.log(error);
  }
});

import { useState } from "react";
import BlockModal from "./components/BlockModal";
import DeleteModal from "./components/DeleteModal";
import Form from "./components/Form";
import Table from "./components/Table";

function App() {
  const [displayForm, setDisplayForm] = useState(false);
  const [searchKey, setSearchKey] = useState("");
  return (
    <>
      <div className="w-[80%] m-auto mt-4 h-[100vh]">
        <main className="main">
          <header className="d-flex justify-content-between mb-3">
            <h3>Nhân viên</h3>
            <button
              className="btn btn-primary"
              onClick={() => setDisplayForm(true)}
            >
              Thêm mới nhân viên
            </button>
          </header>
          <div className="d-flex align-items-center justify-content-end gap-2 mb-3">
            <input
              style={{ width: 350 }}
              type="text"
              className="form-control"
              placeholder="Tìm kiếm theo email"
              onChange={(e) => setSearchKey(e.target.value)}
              value={searchKey}
            />
            <i className="fa-solid fa-arrows-rotate" title="Refresh" onClick={() => setSearchKey("")}/>
          </div>
          {/* Danh sách nhân viên */}
          <Table searchKey={searchKey} />
          <footer className="d-flex justify-content-end">
            <div className="d-flex align-items-center gap-3">
              <select className="form-select">
                <option selected="">Hiển thị 10 bản ghi trên trang</option>
                <option>Hiển thị 20 bản ghi trên trang</option>
                <option>Hiển thị 50 bản ghi trên trang</option>
                <option>Hiển thị 100 bản ghi trên trang</option>
              </select>
            </div>
          </footer>
        </main>
      </div>
      {/* Form thêm mới nhân viên */}
      {displayForm && <Form setDisplayForm={setDisplayForm} />}
    </>
  );
}

export default App;

import mysql from 'mysql'

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "qldh",
  });
  
  // Kết nối tới MySQL
  connection.connect((err) => {
    if (err) {
      console.error("Lỗi kết nối: ", err);
      return;
    }
    console.log("Đã kết nối thành công tới MySQL");
  });
  export default connection;
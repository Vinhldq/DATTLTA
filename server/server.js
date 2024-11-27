const express = require("express");
const admin = require("firebase-admin");
const serviceAccount = require("./spotify-5608f-firebase-adminsdk-3haas-1e1e199068.json");

// Khởi tạo Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();
const app = express();
const PORT = process.env.PORT || 3000; // Cấu hình PORT động
app.use(express.json()); // Để xử lý JSON trong body của các yêu cầu

// Endpoint để lấy tất cả dữ liệu từ Firestore
app.get("/all", async (req, res) => {
  try {
    const jsonCollectionRef = db.collection("spotify"); // Tên collection của bạn
    const snapshot = await jsonCollectionRef.get();

    const data = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));

    res.status(200).json(data);
  } catch (error) {
    console.error("Lỗi khi lấy dữ liệu từ Firestore:", error);
    res.status(500).send("Lỗi khi lấy dữ liệu");
  }
});

// Endpoint để xóa tài liệu theo ID
app.delete("/delete/:id", async (req, res) => {
  try {
    const docId = req.params.id;
    await db.collection("spotify").doc(docId).delete();
    res.status(200).send(`Xóa tài liệu với ID: ${docId} thành công`);
  } catch (error) {
    console.error("Lỗi khi xóa tài liệu:", error);
    res.status(500).send("Lỗi khi xóa tài liệu");
  }
});

// Endpoint để cập nhật tài liệu theo ID
app.put("/update/:id", async (req, res) => {
  try {
    const docId = req.params.id;
    const newData = req.body;
    await db.collection("spotify").doc(docId).update(newData);
    res.status(200).send(`Cập nhật tài liệu với ID: ${docId} thành công`);
  } catch (error) {
    console.error("Lỗi khi cập nhật tài liệu:", error);
    res.status(500).send("Lỗi khi cập nhật tài liệu");
  }
});

// Endpoint để tìm kiếm theo tên
app.get("/search", async (req, res) => {
  try {
    const name = req.query.name;
    const jsonCollectionRef = db.collection("spotify");
    const snapshot = await jsonCollectionRef.where("name", "==", name).get();

    if (snapshot.empty) {
      return res.status(404).send("Không tìm thấy tài liệu với tên được cung cấp");
    }

    const data = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));

    res.status(200).json(data);
  } catch (error) {
    console.error("Lỗi khi tìm kiếm tài liệu:", error);
    res.status(500).send("Lỗi khi tìm kiếm tài liệu");
  }
});

app.listen(PORT, () => {
  console.log(`Server đang chạy tại http://localhost:${PORT}`);
});
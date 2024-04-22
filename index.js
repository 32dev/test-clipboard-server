const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
const port = 3000;

// 이미지 업로드를 위한 Multer 설정
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/') // 업로드된 파일을 저장할 디렉토리 설정
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname) // 파일 이름 설정
  }
});

const upload = multer({ storage: storage });

// 업로드 페이지 렌더링
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// 클라이언트에서 업로드한 이미지를 처리
app.post('/upload', upload.single('image'), (req, res) => {
  // 업로드된 파일 정보는 req.file에 저장됨
  console.log('File uploaded:', req.file);
  // 업로드된 이미지를 클라이언트로 다시 전송
  res.send('File uploaded successfully.');
});

// 정적 파일을 제공하기 위한 미들웨어 설정
app.use(express.static('public'));

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
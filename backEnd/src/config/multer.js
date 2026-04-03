import multer from "multer";

// Store in RAM (not disk) — we only need the buffer to pass to pdf-parse
const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  if (file.mimetype === "application/pdf") {
    cb(null, true); // accept
  } else {
    cb(new Error("Only PDF files are accepted."), false); // reject
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB max
});

export default upload;

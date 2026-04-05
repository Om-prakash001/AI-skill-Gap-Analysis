import multer from "multer";

// Store in RAM (not disk) — we only need the buffer to pass to pdf-parse
const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
 // Created a list of allowed file types (pdf, doc, docx)
 const allowedMimeTypes = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
 ]
  // Check the uploaded file type is on the list
  if(allowedMimeTypes.includes(file.mimetype)){
    cb(null, true); //accept.
  } else{
    cb(new Error("Only PDF and DOCx file are accepted."), false);// Reject
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB max
});

export default upload;

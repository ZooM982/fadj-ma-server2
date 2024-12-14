const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const medocProduct = require("../controllers/products");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); 
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); 
  },
});

const upload = multer({ storage: storage });

router.post("/products", medocProduct.addProduct);
router.get("/product", medocProduct.getProduct);
router.get('/product/:id', medocProduct.getProductById);
router.post('/products', upload.single('image'), medocProduct.addProduct);



module.exports = router;

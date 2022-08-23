// "use strict";
const Product = require("./product.model");
const fs = require("fs");
async function updateProduct(req, res) {
  try {
    const productId = req.params.id;
    const item = await Product.findOne({ _id: productId });
    if (item) {
      item.files.map((e) =>
        fs.unlink((__dirname, e.filePath), function (err) {
          if (err) {
            console.error(err);
          }
        })
      );
      let filesArray = [];
      if (req.files) {
        req.files.forEach((element) => {
          const file = {
            fileName: element.originalname,
            filePath: element.path,
            fileType: element.mimetype,
            fileSize: fileSizeFormatter(element.size, 2),
          };
          filesArray.push(file);
        });
      }
      const demo = {
        name: req.body.name,
        category: req.body.category,
        subCategory: req.body.subCategory,
        title: req.body.title,
        price: req.body.price,
        files: filesArray,
      };
      const up = await Product.findByIdAndUpdate(productId, demo);
      console.log(demo);
      return res.status(200).send(up);
    }
  } catch (err) {
    console.log(err);
    return res.status(400).send(err);
  }
}

async function addProduct(req, res) {
  try {
    const foo = await Product.count();
    const filesArray = [];
    req.files.forEach((element) => {
      const file = {
        fileName: element.originalname,
        filePath: element.path,
        fileType: element.mimetype,
        fileSize: fileSizeFormatter(element.size, 2),
      };
      filesArray.push(file);
    });
    const multipleFiles = new Product({
      name: req.body.name,
      category: req.body.category,
      subCategory: req.body.subCategory,
      title: req.body.title,
      price: req.body.price,
      files: filesArray,
      id: foo + 1,
      count: req.body.count,
    });
    await multipleFiles.save(multipleFiles);
    return res.status(201).send("created");
  } catch (error) {
    console.log(error);
    return res.status(400).send(error.message);
  }
}

const getProduct = async (req, res, next) => {
  try {
    const  {
      limit,
      page
    } = req.body
    const options = {
      sort: { createdAt: -1 },
      page: page,
      limit: limit,
    };
    
    const files = await Product.paginate({active : true}, options);
    return res.status(200).send(files);
  } catch (error) {
    return res.status(400).send(error.message);
  }
};


const fileSizeFormatter = (bytes, decimal) => {
  if (bytes === 0) {
    return "0 Bytes";
  }
  const dm = decimal || 2;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "YB", "ZB"];
  const index = Math.floor(Math.log(bytes) / Math.log(1000));
  return (
    parseFloat((bytes / Math.pow(1000, index)).toFixed(dm)) + " " + sizes[index]
  );
};

async function deleteProduct(req, res) {
  try {
    const productId = req.params.id;
    const del = await Product.findOne({ _id: productId });
    if (del) {
      const pro = await Product.findByIdAndDelete(productId);
      del.files.map((e) =>
        fs.unlink((__dirname, e.filePath), function (err) {
          if (err) {
            console.error(err);
          }
        })
      );
      return res.status(200).json("File has been Deleted");
    }
  } catch (err) {
    return res.status(400).send(err);
  }
}

async function sendHome(req, res) {
  try {
    let foo = await Product.find({}).limit(12)
    return res.status(200).send(foo)
  } catch (err) {
    return res.status(400).send(err);
  }
}

module.exports = {
  addProduct,
  getProduct,
  deleteProduct,
  updateProduct,
  sendHome
};

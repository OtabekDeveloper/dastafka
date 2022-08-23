const userModel = require("./user.model");

async function getuser(req, res) {
  try {
    const user = await userModel.find({});
    return res.status(200).send(user);
  } catch (err) {
    return res.status(400).send(err);
  }
}

async function adduser(req, res) {
  try {
    let old = await userModel.findOne({username : req.body.username})
    let tel = userModel.findOne({tel : req.body.tel})
    if(!old || !tel){
      let body = {
        username : req.body.username,
        tel : req.body.tel,
        password : req.body.password,
        code : 1111
      }
      let user = await userModel.create(body)
      return res.status(201).send(user)
    }
    if(old){
      return res.status(400).send("ushbu username band");
    }
    return res.status(400).send("ushbu telefon raqam oldin registratsiya qilingan");
  } catch (err) {
    return res.status(400).send(err);
  }
}

async function updateuser(req, res) {
  try {
    let userId = req.params.id;
    let result = await userModel.findByIdAndUpdate(userId , req.body);
    return res.status(200).send(result);
  } catch (err) {
    return res.status(400).send(err);
  }
}

async function deleteuser(req, res) {
  try {
    let userId = req.params.id;
    let result = await userModel.findByIdAndRemove(userId);
    return res.status(200).send(result);
  } catch (err) {
    return res.status(400).send(err);
  }
}

module.exports = {
  getuser,
  adduser,
  deleteuser,
  updateuser
};

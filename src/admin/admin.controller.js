async function addAdmin(req, res) {
  try {
    console.log(req.data);
    if (req.body.password === "admin" && req.body.login === "123") {
      return res.status(200).send(true);
    } else {
      return res.status(200).send(false);
    }
  } catch (err) {
    res.status(400).send(err);
  }
}

module.exports = {
  addAdmin,
};

var express = require("express");
var router = express.Router();
const middleware = require("../middleware");
const client = require("../controllers/clients");

router.get("/", middleware.checkToken, middleware.checkRole, function (
  req,
  res,
  next
) {
  client.getClients((result) => {
    console.log(result);
    if (result[0] != 0) res.send(result);
    else return res.status(404).send("Error");
  });
});

router.get("/:id", middleware.checkToken, middleware.checkRole, function (
  req,
  res,
  next
) {
  console.log(req.params.id);
  client.getClient(req.params.id, (result) => {
    console.log(result);
    if (result) res.send(result);
    else return res.status(404).send("Client not found");
  });
});

router.post("/", middleware.checkToken, middleware.checkRole, function (
  req,
  res,
  next
) {
  newClient = {
    name: req.body.name,
    age: parseInt(req.body.age),
  };
  client.addClient(newClient, (result) => {
    console.log(result);
    res.send(result);
  });
});

router.put("/:id", middleware.checkToken, middleware.checkRole, function (
  req,
  res,
  next
) {
  modifiedClient = {
    name: req.body.name,
    age: parseInt(req.params.age),
  };
  client.updateClient(req.params.id, modifiedClient, (result) => {
    if (result.result.nModified == 1 && result.result.ok == 1) res.send(result);
    else return res.status(404).send("Client not found or not updated");
  });
});

router.delete("/:id", middleware.checkToken, middleware.checkRole, function (
  req,
  res,
  next
) {
  client.deleteClient(req.params.id, (result) => {
    if (result.result.n == 1 && result.result.ok == 1) res.send(result);
    else return res.status(404).send("Client not found");
  });
});

module.exports = router;

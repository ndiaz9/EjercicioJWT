const conn = require("../lib/MongoUtils");
let ObjectID = require("mongodb").ObjectID;

const getClients = (callback) => {
  conn.then((DBclient) => {
    DBclient.db("EjercicioJWT")
      .collection("clients")
      .find({})
      .toArray((err, data) => {
        callback(data);
      });
  });
};

const getClient = (id, callback) => {
  conn.then((DBclient) => {
    DBclient.db("EjercicioJWT")
      .collection("clients")
      .findOne({ _id: new ObjectID(id) })
      .then((data) => {
        callback(data);
      });
  });
};

const addClient = (newClient, callback) => {
  conn.then((DBclient) => {
    DBclient.db("EjercicioJWT")
      .collection("clients")
      .insertOne(newClient)
      .then((data) => {
        callback(data);
      });
  });
};

const updateClient = (id, newClient, callback) => {
  conn.then((DBclient) => {
    DBclient.db("EjercicioJWT")
      .collection("clients")
      .updateOne({ _id: new ObjectID(id) }, { $set: newClient })
      .then((data) => {
        callback(data);
      });
  });
};

const deleteClient = (id, callback) => {
  conn.then((DBclient) => {
    DBclient.db("EjercicioJWT")
      .collection("clients")
      .deleteOne({ _id: new ObjectID(id) })
      .then((data) => {
        callback(data);
      });
  });
};

const client = {
  getClients,
  getClient,
  addClient,
  updateClient,
  deleteClient,
};
module.exports = client;

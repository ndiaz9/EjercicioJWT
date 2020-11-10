const conn = require("../lib/MongoUtils");
let ObjectID = require("mongodb").ObjectID;

const getUser = (username, callback) => {
  conn.then((DBclient) => {
    DBclient.db("EjercicioJWT")
      .collection("users")
      .findOne({ username })
      .then((data) => {
        callback(data);
      });
  });
};

const getUserID = (token, callback) => {
  conn.then((DBclient) => {
    DBclient.db("EjercicioJWT")
      .collection("tokens")
      .findOne({ token })
      .then((data) => {
        callback(data);
      });
  });
};

const getRole = (id, callback) => {
  conn.then((DBclient) => {
    DBclient.db("EjercicioJWT")
      .collection("roles")
      .findOne({ _id: new ObjectID(id) })
      .then((data) => {
        callback(data);
      });
  });
};

const getRolesUser = (idUser, callback) => {
  conn.then((DBclient) => {
    DBclient.db("EjercicioJWT")
      .collection("rolesuser")
      .findOne({ idUser })
      .then((data) => {
        callback(data);
      });
  });
};

const addToken = (newToken, callback) => {
  conn.then((DBclient) => {
    DBclient.db("EjercicioJWT")
      .collection("tokens")
      .insertOne(newToken)
      .then((data) => {
        callback(data);
      });
  });
};

const login = {
  getUser,
  getUserID,
  getRole,
  getRolesUser,
  addToken,
};
module.exports = login;

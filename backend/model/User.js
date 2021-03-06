const con = require("../config/db");
const uuid4 = require("uuid4");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

require("dotenv").config();

module.exports = {
  createUser: async function (data, result) {
    const newUser = {
      id: uuid4(),
      email: data.email,
      password: data.password,
      firstname: data.firstname,
      lastname: data.lastname,
      created_at: new Date()
    };

    // encrypt password
    const salt = await bcrypt.genSalt(10);
    newUser.password = await bcrypt.hash(data.password, salt);

    const sql = `INSERT INTO users (id, email, password, firstname, lastname, created_at) VALUES (?, ?, ?, ?, ?, ?)`;
    con.query(sql, [newUser.id, newUser.email, newUser.password, newUser.firstname, newUser.lastname, newUser.created_at], (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      result(null, "Success...");
      return;
    });
  },

  loginUser: function (data, result) {
    const sql = `SELECT id, password FROM users WHERE email = '${data.email}'`;
    con.query(sql, async (err, res) => {
      if (Object.keys(res).length === 0) {
        result("Invalid credentionals", null);
        return;
      }
      const isMatch = await bcrypt.compare(data.password, res[0].password, (err, matched) => {
        if (err || !matched) {
          result("Invalid credentionals", null);
          return;
        }

        const payload = {
          user: {
            id: res[0].id
          }
        };

        jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: "5 days" }, (err, token) => {
          if (err) throw err;
          result(null, token);
          return;
        });
      });
    });
  },

  getUser: function (id, result) {
    const sql = `SELECT id, email, firstname, lastname, created_at FROM users WHERE id = '${id}'`;
    con.query(sql, async (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      console.log(id);
      result(null, res);
      return;
    });
  }
};

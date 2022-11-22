const express = require("express");
const db = require("../db.config/db.config.js");
const jwt = require("jsonwebtoken");
//const Auth = require('./auth')
const cookieParser = require("cookie-parser");
require("dotenv").config();
const bcrypt = require("bcrypt");
const { application } = require("express");

SECRET = process.env.SECRET;

const register = async (req, res, next) => {
  // * 7. silahkan ubah password yang telah diterima menjadi dalam bentuk hashing

  const { username, email, password } = req.body;

  // saltRounds = 10;
  bcrypt.hash(password, 10, async function (err, hash) {
    // 8. Silahkan coding agar pengguna bisa menyimpan semua data yang diinputkan ke dalam database
    try {
      await db.query(`INSERT INTO unhan_modul_17 VALUES(DEFAULT, $1, $2, $3)`, [
        username,
        email,
        hash,
      ]);
      res.send("input data sukses");
    } catch (err) {
      console.log(err.message);
      return res.status(500).send(err);
    }
  });
};

const login = async (req, res, next) => {
  // 9. komparasi antara password yang diinput oleh pengguna dan password yang ada didatabase
  const { email, password } = req.body;
  const hash = await db.query(`select * from unhan_modul_17 where email=$1 `, [
    email,
  ]);

  const user = hash.rows[0];
  console.log(user)


  bcrypt.compare(password, user.password, function (err, result) {
    if (err) {
      // handle error
      console.log(err.message);
      return res.status(500).send(err);
    }
    if (result) {
      //10. Generate token menggunakan jwt sign
      const token = jwt.sign(
        {
          id: user.id,
          username: user.username,
          email: user.email,
          password: user.password,
        },
        process.env.SECRET
      );
      user.token = token;

      //11. kembalikan nilai id, email, dan username
      res.cookie("jwt", token, { maxAge: 1 * 24 * 60 * 60, httpOnly: true });
      return res.status(200).send({
        id: user.id,
        username: user.username,
        email: user.email,
        // password: user[0].password,
        token: token,
      });
    } else {
      // response is OutgoingMessage object that server response http request
      res.send("Login gagal, Periksa Username atau Password");
    }
  });
};

const logout = async (req, res, next) => {
  const { token } = req.body;
  
  try {
    // 14. code untuk menghilangkan token dari cookies dan mengembalikan pesan "sudah keluar dari aplikasi"
    return res.clearCookie("jwt").send("Logout Sukses!");
  } catch (err) {
    console.log(err.message);
    return res.status(500).send(err);
  }
};

const verify = async (req, res, next) => {
  const { email } = req.body;
  const theRow = await db.query(
    "SELECT * FROM unhan_modul_17 WHERE email=$1;",
    [email]
  );
  const user = theRow.rows;
  console.log(user);
  try {
    // 13. membuat verify
    const data = req.verified;

    return res.status(200).send({
      data,
      // id: user[0].id,
      // username: user[0].username,
      // email: user[0].email,
      // password: user[0].password,
    });
  } catch (err) {
    console.log(err.message);
    return res.status(500).send(err);
  }
};

module.exports = {
  register,
  login,
  logout,
  verify,
};

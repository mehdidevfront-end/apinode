const express = require("express");

const app = express();
app.use(express.json());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

const VoutureRoutes = require("./routes/Vouture");
const UsersRoutes = require("./routes/Users");
const CommedRoutes = require("./routes/commed");
const statutvoitures = require("./routes/statutvoitures");

app.use("/api/Vouture", VoutureRoutes);
app.use("/api/auto", UsersRoutes);

app.use("/api/statutvoitures", statutvoitures);
app.use("/api/Commed", CommedRoutes);
module.exports = app;

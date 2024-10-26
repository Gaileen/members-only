require("dotenv").config();
const express = require("express");
const memberRouter = require("./routes/memberRouter");
const app = express();
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use("/", memberRouter);

const port = process.env.PORT;
app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});
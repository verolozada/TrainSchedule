const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const path = require("path");
const PORT = process.env.PORT || 8080;

app.use(express.static("app/public"));
app.use("/images", express.static(__dirname + "app/public/images"));
// app.use(express.static(path.join(__dirname, "/public")));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

require("./app/routes/htmlRoutes")(app)

app.listen(PORT, () => {
    console.log(`Server http://localhost:${PORT}`);
});
const express = require("express");
const cors = require("cors");
const hbs = require("hbs");
const dotenv = require("dotenv");
const path = require("path");
const apicache = require("apicache");

dotenv.config({ path: "./config/config.env" });

hbs.registerHelper("prettifyDate", function (timestamp) {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(timestamp * 1000).toLocaleDateString("en-GB", options);
});

hbs.registerHelper("isNotNull", function (value) {
    return value !== null;
});

hbs.registerHelper("limit", function (arr, limit) {
    if (!Array.isArray(arr)) {
        return [];
    }
    return arr.slice(0, limit);
});

const app = express();
const cache = apicache.middleware;

//Middleware
app.use(cors());
app.use(cache("1 hour"));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");

app.use(express.static(path.join(__dirname, "/public")));

app.use("/", require("./routes/index"));

const PORT = process.env.PORT || 4567;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

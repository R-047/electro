const express = require("express");
const cors = require('cors')
const cookieParser = require("cookie-parser");
const expressSession = require("express-session");
const bodyParser = require("body-parser");
const app = express();
const path = require("path")


//utility middlewares
app.use(cookieParser());
app.use(expressSession({ secret: "its a secret"}));
app.use(bodyParser.urlencoded({
	extended: true
}))

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(express.static('public'));


// app.use(Authenticate);

// test api
app.use('/healthCheck', require("./routes/healthCheckRoute").healthCheckRoute);
app.use('/healthCheckRead', require("./routes/healthCheckRoute").healthCheckDbReadRoute);
app.use('/healthCheckWrite', require("./routes/healthCheckRoute").healthCheckDbReadWriteRoute);

app.use('/track', require("./routes/trackRoute"))
app.use('/fetchPowerGraph', require("./routes/fetchPowerGraph"))



const port = process.env.PORT || 3000;
app.listen(port, () => console.log("server running on port 3000...CORS enabled"))


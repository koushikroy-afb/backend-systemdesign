const express = require("express");
const routes = require("./routes");

const app = express();
app.use(express.json()); // MUST be here

app.use("/", routes);

app.listen(3000, () => {
  console.log("Notification service running on port 3000");
});

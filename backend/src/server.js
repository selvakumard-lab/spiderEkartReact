require("dotenv").config();
const app = require("./app");
const db = require("./models");



db.sequelize.authenticate()
  .then(() => console.log("DB Connected ✅"))
  .catch(err => console.error("DB Error ❌", err));

app.listen(process.env.PORT, () => {
  console.log(`Server running on ${process.env.PORT}`);
});

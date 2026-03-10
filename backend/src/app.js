const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const path = require("path");

app.use(
  "/uploads",
  express.static(path.join(__dirname, "uploads"))
);

// app.get("/", (req, res) => {
//   res.send("Spider Ekart Backend Running 🚀");
// });


app.use("/api/auth", require("./routes/auth.routes"));
app.use("/api/tenants", require("./routes/tenant.routes"));
app.use("/api/category", require("./routes/category.routes"));
app.use("/api/subcategory", require("./routes/subcategory.routes"));
app.use("/api/brand", require("./routes/brand.routes"));
app.use("/api/delverymethod", require("./routes/delverymethod.routes"));
app.use("/api/homebanner", require("./routes/homebanner.routes"));
app.use("/api/offerbanner", require("./routes/offerbanner.routes"));
app.use("/api/promocode", require("./routes/promocode.routes"));
app.use("/api/featuredsection", require("./routes/featuredsection.routes"));
app.use("/api/customer", require("./routes/customer.routes"));
app.use("/api/deliveryboy", require("./routes/deliveryboy.routes"));
app.use("/api/notification", require("./routes/notification.routes"));
app.use("/api/settings", require("./routes/settings.routes"));

app.use("/api/state", require("./routes/state.routes"));
app.use("/api/district", require("./routes/district.routes"));
app.use("/api/city", require("./routes/city.routes"));
app.use("/api/area", require("./routes/area.routes"));

app.use("/api/faq", require("./routes/faq.routes"));



module.exports = app;
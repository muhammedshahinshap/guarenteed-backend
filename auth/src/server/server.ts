import app from "../app";
const port = 4000;

app.set("4000", port);
app.listen(port, () => {
  console.log("running on ", port);
});

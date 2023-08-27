import app from "../app";
const port = 4002;

app.set("4002", port);
app.listen(port, () => {
  console.log("running on ", port);
});

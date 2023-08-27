import app from "../app";
const port = 4001;


app.set("4001", port);
app.listen(port, () => {
  console.log("running on ", port);
});

const express = require("express");
const path = require("path");

const app = express();

app.use("/Static", express.static(path.resolve(__dirname, "Client", "Static")));

app.get("/*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "Client", "index.html"));
});

const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`Server starting on port ${port}`));
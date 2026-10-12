import express from "express";
import cors from "cors";

const app = express();
app.use(cors({ optionsSuccessStatus: 200 }));

function handleTimestamp(req, res) {
  const input = req.params.date;
  let date;

  if (input === undefined) {
    date = new Date();
  } else if (/^\d+$/.test(input)) {
    date = new Date(Number(input));
  } else {
    date = new Date(input);
  }

  if (isNaN(date.getTime())) {
    return res.json({ error: "Invalid Date" });
  }

  return res.json({
    unix: date.getTime(),
    utc: date.toUTCString()
  });
}

app.get("/api", handleTimestamp);
app.get("/api/:date", handleTimestamp);

const PORT = 8000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

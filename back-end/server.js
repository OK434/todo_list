const express = require('express');
const cors = require('cors');

const app = express();

require('./routes/db');

app.use(cors({
  origin: ['http://localhost:3000', "https://todo-list-zi28.vercel.app"
  ],
  credentials: true
}));

app.use(express.json());

app.use('/api', require('./routes/auth'));
app.use('/api', require('./routes/task'));

require('./Job/emailReminder');

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: "Server error" });
});

app.listen(1231, () => {
  console.log("Server running on port 1231");
});
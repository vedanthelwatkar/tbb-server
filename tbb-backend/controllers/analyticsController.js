import { connection } from "../db.js";

export const getAnalytics = (req, res) => {
  connection.query("SELECT * FROM analytics", (err, result) => {
    if (err) {
      res.status(500).json({ message: err.stack });
      return;
    }

    res.status(200).json({ message: result });
  });
};

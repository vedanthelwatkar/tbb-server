import { pool } from "../db.js";

export const getAnalytics = (req, res) => {
  pool.query("SELECT * FROM analytics", (err, results) => {
    if (err) {
      console.error("Database query error:", err.stack);
      res
        .status(500)
        .json({ message: "Internal server error", error: err.stack });
      return;
    }

    res.status(200).json({ message: "Success", data: results });
  });
};

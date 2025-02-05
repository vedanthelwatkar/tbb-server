import { pool } from "../db.js";

export const updateStatus = (req, res) => {
  const { isActive } = req.body;

  const query = `UPDATE themes SET isActive = ?`;

  pool.query(query, [isActive], (err) => {
    if (err) {
      return res.status(500).json({ error: "Failed to update status", err });
    }

    return res.status(200).json({
      message: isActive
        ? "System activated successfully"
        : "System deactivated successfully",
    });
  });
};

export const getStatus = (req, res) => {
  const query = `SELECT isActive FROM themes`;

  pool.query(query, (err, results) => {
    if (err) {
      return res.status(500).json({ error: "Failed to fetch status", err });
    }

    const isActive = results[0]?.isActive ?? false;
    return res.status(200).json({ isActive });
  });
};

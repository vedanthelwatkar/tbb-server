import { pool } from "../db.js";

export const updateProfile = (req, res) => {
  const { name, email, phone, address } = req.body;

  const query = `UPDATE profile 
                 SET name = ?, email = ?, phone = ?, address = ?`;

  pool.query(query, [name, email, phone, address], (err) => {
    if (err) {
      return res.status(500).json({ error: "Something went wrong", err });
    }

    res.status(200).json({ message: "Profile updated successfully" });
  });
};

export const getProfile = (req, res) => {
  pool.query("SELECT * FROM profile", (err, results) => {
    if (err) {
      return res.status(500).json({ error: "Something went wrong" });
    }

    res.status(200).json(results[0]);
  });
};

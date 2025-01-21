import { connection } from "../db.js";

export const updateProfile = (req, res) => {
  const profileData = req.body;
  const name = connection.escape(profileData.name);
  const email = connection.escape(profileData.email);
  const phone = connection.escape(profileData.phone);
  const address = connection.escape(profileData.address);

  const query = `UPDATE profile SET name = ${name}, email = ${email}, phone = ${phone}, address = ${address}`;

  connection.query(query, (err) => {
    if (err) {
      return res.status(500).json({ error: "Something went wrong" });
    }

    res.status(200).json({ message: "Profile updated successfully" });
  });
};

export const getProfile = (req, res) => {
  connection.query("SELECT * FROM profile", (err, results) => {
    if (err) {
      return res.status(500).json({ error: "Something went wrong" });
    }

    res.status(200).json(results[0]);
  });
};

import { connection } from "../db.js";

export const getDetails = (req, res) => {
  const { page } = req.query;
  const query = `SELECT * FROM ${page.toLowerCase()}`;

  connection.query(query, (err, result) => {
    if (err) {
      return res.status(500).json({ error: "Something went wrong", err });
    }

    res.status(200).json({ table: page, result });
  });
};

export const getAllDetails = (req, res) => {
  const query = `
    SELECT * FROM home;
    SELECT * FROM about;
    SELECT * FROM services;
    SELECT * FROM book;
    SELECT * FROM contact;
  `;

  connection.query(query, (err, result) => {
    if (err) {
      return res
        .status(500)
        .json({ error: "Something went wrong", details: err });
    }

    return res.status(200).json({
      home: result[0],
      about: result[1],
      services: result[2],
      book: result[3],
      contact: result[4],
    });
  });
};

export const deleteDetails = (req, res) => {
  const { id, page } = req.query;

  if (!id || !page) {
    return res.status(400).json({ message: "Missing id or page parameter" });
  }

  connection.query(`DELETE FROM ${page} WHERE id = ?`, [id], (err, result) => {
    if (err) {
      console.error("Delete error:", err);
      return res.status(500).send({ error: "Something went wrong" });
    }
    res.status(200).json({ message: "Section deleted successfully" });
  });
};

export const updateDetails = (req, res) => {
  const { page } = req.query;
  const data = req.body;

  if (!page || !data || !Array.isArray(data)) {
    return res.status(400).json({ message: "Invalid request parameters" });
  }

  data.forEach((item) => {
    if (item.id) {
      connection.query(
        `UPDATE ${page} SET title = ?, description = ? WHERE id = ?`,
        [item.title, item.description, item.id],
        (err) => {
          if (err) {
            return res.status(500).json({ error: err });
          }
        }
      );
    } else {
      connection.query(
        `INSERT INTO ${page} (title, description) VALUES (?, ?)`,
        [item.title, item.description],
        (err) => {
          if (err) {
            return res.status(500).json({ error: err });
          }
        }
      );
    }
  });
  res.status(200).json({ message: "Configuration updates successfully" });
};

import { connection } from "../db.js";

export const bookAppointment = (req, res) => {
  const { name, email, phone, date } = req.body;

  const query = `INSERT INTO appointment (name, email, phone, date) 
     VALUES (?, ?, ?, ?)`;

  connection.query(query, [name, email, phone, date], (err, results) => {
    if (err) {
      if (err.errno == 1062) {
        res.status(409).json({ error: "Already Booked !", err });
        return;
      }
      res.status(500).json({ error: "Something went wrong!", err });
      return;
    }

    res.status(200).json({ message: "Appointment Booked!" });
  });
};

export const getAppointments = (req, res) => {
  const { sort = "asc" } = req.query;
  const order = sort.toLowerCase() === "desc" ? "DESC" : "ASC";

  const query = `SELECT * FROM appointment ORDER BY date ${order}`;

  connection.query(query, (err, results) => {
    if (err) {
      res.status(500).json({ error: "Something went wrong!", err });
      return;
    }

    res.status(200).json({
      message: "Appointments fetched successfully",
      totalEntries: results.length,
      results: results,
    });
  });
};

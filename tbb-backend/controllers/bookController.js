import fs from "fs";
import { pool } from "../db.js";

const backupAppointment = (appointmentData) => {
  const backupFilePath = "./appointments_backup.json";

  fs.readFile(backupFilePath, "utf8", (err, data) => {
    let appointments = [];

    if (err && err.code === "ENOENT") {
      appointments = [];
    } else if (err) {
      console.error("Error reading backup file:", err);
      return;
    } else {
      appointments = JSON.parse(data);
    }

    appointments.push(appointmentData);

    fs.writeFile(
      backupFilePath,
      JSON.stringify(appointments, null, 2),
      (err) => {
        if (err) {
          console.error("Error writing to backup file:", err);
        } else {
          console.log("Appointment backup saved!");
        }
      }
    );
  });
};

export const bookAppointment = (req, res) => {
  const { name, email, phone, date } = req.body;

  const query = `INSERT INTO appointment (name, email, phone, date) 
     VALUES (?, ?, ?, ?)`;

  pool.query(query, [name, email, phone, date], (err, results) => {
    if (err) {
      if (err.errno == 1062) {
        res.status(409).json({ error: "Already Booked !", err });
        return;
      }
      res.status(500).json({ error: "Something went wrong!", err });
      return;
    }

    const appointmentData = { name, email, phone, date };
    backupAppointment(appointmentData);

    res.status(200).json({ message: "Appointment Booked!" });
  });
};

export const getAppointments = (req, res) => {
  const { sort = "asc" } = req.query;
  const order = sort.toLowerCase() === "desc" ? "DESC" : "ASC";

  const query = `SELECT * FROM appointment ORDER BY date ${order}`;

  pool.query(query, (err, results) => {
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

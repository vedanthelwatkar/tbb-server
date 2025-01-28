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

  const formattedDate = new Date(date).toLocaleString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  const query = `INSERT INTO appointment (name, email, phone, date) 
     VALUES (?, ?, ?, ?)`;

  pool.query(query, [name, email, phone, date], (err, results) => {
    if (err) {
      if (err.errno == 1062) {
        res.status(409).json({ error: "Already Booked!", err });
        return;
      }
      res.status(500).json({ error: "Something went wrong!", err });
      return;
    }

    const appointmentData = { name, email, phone, date };
    backupAppointment(appointmentData);

    const emailTemplate = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            .email-container {
              max-width: 600px;
              margin: 0 auto;
              font-family: Arial, sans-serif;
              line-height: 1.6;
            }
            .header {
              background-color: #4CAF50;
              color: white;
              padding: 20px;
              text-align: center;
              border-radius: 5px 5px 0 0;
            }
            .content {
              padding: 20px;
              background-color: #f9f9f9;
              border: 1px solid #ddd;
            }
            .appointment-details {
              background-color: white;
              padding: 15px;
              margin: 20px 0;
              border-radius: 5px;
              border-left: 4px solid #4CAF50;
            }
            .footer {
              text-align: center;
              padding: 20px;
              font-size: 0.8em;
              color: #666;
            }
          </style>
        </head>
        <body>
          <div class="email-container">
            <div class="header">
              <h2>New Appointment Booked!</h2>
            </div>
            <div class="content">
              <p>A new appointment has been scheduled with the following details:</p>
              
              <div class="appointment-details">
                <p><strong>Patient Name:</strong> ${name}</p>
                <p><strong>Contact Email:</strong> ${email}</p>
                <p><strong>Phone Number:</strong> ${phone}</p>
                <p><strong>Appointment Date:</strong> ${formattedDate}</p>
              </div>
              
              <p>Please review the appointment details and ensure everything is in order.</p>
              <p>If any changes are needed, please contact the patient directly.</p>
            </div>
            <div class="footer">
              <p>This is an automated message. Please do not reply to this email.</p>
              <p>© ${new Date().getFullYear()} Your Clinic Name. All rights reserved.</p>
            </div>
          </div>
        </body>
      </html>
    `;

    transporter
      .sendMail({
        from: '"Your Clinic Name 🏥" <your-email@gmail.com>',
        to: "helwatkarvedant@gmail.com",
        subject: `New Appointment: ${name} - ${formattedDate}`,
        text: `New appointment booked by ${name} for ${formattedDate}. Contact: ${phone}, Email: ${email}`,
        html: emailTemplate,
      })
      .then(() => {
        res.status(200).json({ message: "Appointment Booked!" });
      })
      .catch((error) => {
        console.error("Email sending failed:", error);
        res.status(200).json({ message: "Appointment Booked!" });
      });
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

import fs from "fs";
import { pool } from "../db.js";
import { transporter } from "../mailService.js";

const backupAppointment = (appointmentData) => {
  const backupFilePath = "../appointments_backup.json";

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
  const { name, email, phone, date, time } = req.body;

  const [year, month, day] = date.split("-");
  const [hours, minutes] = time.split(":");

  if (hours < 0 || hours > 23 || minutes < 0 || minutes > 59) {
    return res.status(400).json({
      error: "Invalid time format. Please use 24-hour format (00:00 - 23:59)",
    });
  }

  const appointmentDate = new Date(
    `${year}-${month}-${day}T${hours}:${minutes}:00+10:30`
  );

  const formattedDate = appointmentDate.toLocaleString("en-AU", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    timeZone: "Australia/Adelaide",
  });

  const query = `INSERT INTO appointment (name, email, phone, date, time) 
     VALUES (?, ?, ?, ?, ?)`;

  pool.query(query, [name, email, phone, date, time], (err, results) => {
    if (err) {
      if (err.errno == 1062) {
        res.status(409).json({ error: "Already Booked!", err });
        return;
      }
      res.status(500).json({ error: "Something went wrong!", err });
      return;
    }

    const appointmentData = { name, email, phone, date, time };
    backupAppointment(appointmentData);

    const emailTemplate = `
     <!DOCTYPE html>
      <html>
      <head>
      <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet">
      <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet">
      <style>
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          font-family: 'Poppins', sans-serif;
        }
        
        .email-container {
          max-width: 600px;
          margin: 0 auto;
          line-height: 1.6;
          background-color: #ffffff;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          border-radius: 12px;
          overflow: hidden;
        }

        .header {
          background: linear-gradient(135deg, #2E7D32 0%, #388E3C 100%);
          color: white;
          padding: 30px 20px;
          text-align: center;
          position: relative;
          overflow: hidden;
        }

        .header::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-image: url('/api/placeholder/600/200');
          opacity: 0.1;
          background-size: cover;
          background-position: center;
        }

        .header h2 {
          font-weight: 600;
          font-size: 24px;
          position: relative;
          margin-bottom: 10px;
        }

        .tree-icon {
          font-size: 32px;
          margin-bottom: 15px;
          color: rgba(255, 255, 255, 0.9);
        }

        .content {
          padding: 30px;
          background-color: #ffffff;
        }

        .appointment-details {
          background-color: #F5F9F5;
          padding: 25px;
          margin: 20px 0;
          border-radius: 10px;
          border-left: 4px solid #2E7D32;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
        }

        .appointment-details p {
          margin: 12px 0;
          color: #333;
        }

        .appointment-details strong {
          color: #1B5E20;
          font-weight: 500;
        }

        .content p {
          color: #555;
          font-size: 15px;
          line-height: 1.7;
        }

        .footer {
          text-align: center;
          padding: 25px;
          background-color: #F5F9F5;
          font-size: 0.9em;
          color: #666;
          border-top: 1px solid #e0e0e0;
        }

        .footer p {
          margin: 5px 0;
          font-size: 13px;
        }

        .eco-friendly {
          margin-top: 15px;
          color: #2E7D32;
          font-size: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 5px;
        }
      </style>
      </head>
      <body style="background-color: #f0f2f0; padding: 20px;">
      <div class="email-container">
        <div class="header">
          <i class="fas fa-tree tree-icon"></i>
          <h2>New Appointment Confirmed</h2>
          <p style="opacity: 0.9; font-weight: 300;">The Banyan Branch</p>
        </div>
        <div class="content">
          <p>We're pleased to confirm your upcoming appointment with the following details:</p>
          
          <div class="appointment-details">
            <p><strong>Client Name:</strong> ${name}</p>
            <p><strong>Contact Email:</strong> ${email}</p>
            <p><strong>Phone Number:</strong> ${phone}</p>
            <p><strong>Appointment Date and Time:</strong> ${formattedDate}</p>
          </div>
          
          <p style="margin-top: 20px; font-size: 14px; color: #666;">
            <strong style="color: #2E7D32;">Important Note:</strong> Contact the client if necessary
          </p>
        </div>
        <div class="footer">
          <p>This is an automated message. Please do not reply to this email.</p>
          <p>© ${new Date().getFullYear()} The Banyan Branch. All rights reserved.</p>
          <div class="eco-friendly">
            <i class="fas fa-leaf"></i>
          </div>
        </div>
      </div>
      </body>
      </html>
    `;

    const clientTemplate = `
    <!DOCTYPE html>
    <html>
    <head>
      <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet">
      <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet">
      <style>
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          font-family: 'Poppins', sans-serif;
        }
        
        body {
          background-color: #f0f2f0;
          padding: 20px;
        }

        .email-container {
          max-width: 600px;
          margin: 0 auto;
          background: #ffffff;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }

        .header {
          background: linear-gradient(135deg, #2E7D32 0%, #388E3C 100%);
          color: white;
          padding: 30px 20px;
          text-align: center;
          position: relative;
        }

        .header::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: radial-gradient(circle at 70% 30%, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0) 70%);
        }

        .header h2 {
          font-weight: 600;
          font-size: 24px;
          margin-bottom: 5px;
          position: relative;
          z-index: 1;
        }

        .content {
          padding: 30px;
        }

        .welcome-text {
          text-align: center;
          margin-bottom: 25px;
          color: #333;
        }

        .appointment-card {
          background: linear-gradient(to right, #f8f9f8, #ffffff);
          border-left: 4px solid #2E7D32;
          padding: 25px;
          margin: 20px 0;
          border-radius: 8px;
        }

        .detail-row {
          display: flex;
          align-items: center;
          margin: 15px 0;
          color: #333;
        }

        .detail-row i {
          color: #2E7D32;
          width: 20px;
          margin-right: 10px;
        }

        .detail-row strong {
          color: #1B5E20;
          margin-right: 8px;
        }

        .next-steps {
          background: #f8f9f8;
          padding: 20px;
          border-radius: 8px;
          margin-top: 20px;
        }

        .next-steps h3 {
          color: #2E7D32;
          font-size: 16px;
          margin-bottom: 10px;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .footer {
          background: #f8f9f8;
          padding: 20px;
          text-align: center;
          font-size: 13px;
          color: #666;
          border-top: 1px solid #eee;
        }
      </style>
    </head>
    <body>
      <div class="email-container">
        <div class="header">
          <i class="fas fa-heart" style="font-size: 32px; margin-bottom: 15px;"></i>
          <h2>Your Session is Confirmed</h2>
          <p style="opacity: 0.9;">The Banyan Branch</p>
        </div>
        <div class="content">
          <div class="welcome-text">
            <h3>Thank you for choosing us for your online therapy session</h3>
            <p>We look forward to speaking with you</p>
          </div>
          
          <div class="appointment-card">
            <div class="detail-row">
              <i class="fas fa-calendar"></i>
              <strong>Session Date and Time:</strong> ${formattedDate}
              <p><strong>Timezone:</strong> Australian Central Daylight Time (ACDT/UTC+10:30)</p>
            </div>
            <div class="detail-row">
              <i class="fas fa-video"></i>
              <strong>Session Type:</strong> Online
            </div>
          </div>

          <div class="next-steps">
            <h3><i class="fas fa-info-circle"></i> What's Next?</h3>
            <p>Our team will contact you shortly with your session link and any additional information you might need. We'll ensure you're fully prepared for your online session.</p>
          </div>
        </div>
        <div class="footer">
          <p>© ${new Date().getFullYear()} The Banyan Branch</p>
          <strong>Note:</strong> All times are in Australian Central Daylight Time (ACDT/UTC+10:30). Please adjust for your local timezone.
        </div>
      </div>
    </body>
    </html>
    `;

    Promise.all([
      transporter.sendMail({
        from: '"The Banyan Branch 🏥" <write2priya.r@gmail.com>',
        to: "vedanthelwatkar@gmail.com",
        subject: `New Appointment: ${name} - ${formattedDate} ACDT`,
        text: `New appointment booked by ${name} for ${formattedDate}. Contact: ${phone}, Email: ${email}`,
        html: emailTemplate,
      }),
      transporter.sendMail({
        from: '"The Banyan Branch 🏥" <write2priya.r@gmail.com>',
        to: email,
        subject: `Appointment Confirmation: ${name} - ${formattedDate} ACDT`,
        text: `Appointment booked for ${name} for ${formattedDate}. Contact: ${phone}, Email: ${email}`,
        html: clientTemplate,
      }),
    ])
      .then(() => {
        res.status(200).json({ message: "Appointment Booked!" });
      })
      .catch((error) => {
        console.error("Email sending failed:", error);
        res.status(200).json({
          message: "Appointment Booked, but email notification failed.",
        });
      });
  });
};

export const getAppointments = (req, res) => {
  const { sort = "asc" } = req.query;
  const order = sort.toLowerCase() === "desc" ? "DESC" : "ASC";

  const query = `SELECT *, DATE_FORMAT(date, '%Y-%m-%d') AS formatted_date, 
                 TIME_FORMAT(time, '%H:%i') AS formatted_time 
                 FROM appointment ORDER BY date ${order}, time ${order}`;

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

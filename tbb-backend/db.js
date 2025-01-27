import mysql from "mysql2";

// Create a connection with automatic reconnect
export const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  database: "the_banyan_branch",
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  multipleStatements: true,

  // Enable automatic reconnection
  waitForConnections: true,
  connectTimeout: 10000, // 10 seconds
  resetAfterUse: true,
});

// Handle disconnects and reconnects
function handleDisconnect() {
  connection.connect((err) => {
    if (err) {
      console.error("Error connecting to the database:", err);
      // Try to reconnect in 2 seconds
      setTimeout(handleDisconnect, 2000);
      return;
    }
    console.log("Connected to the database as ID " + connection.threadId);
  });

  connection.on("error", (err) => {
    console.error("Database error:", err);
    if (
      err.code === "PROTOCOL_CONNECTION_LOST" ||
      err.code === "ECONNRESET" ||
      err.code === "PROTOCOL_ENQUEUE_AFTER_FATAL_ERROR"
    ) {
      console.log("Lost connection to MySQL server. Reconnecting...");
      handleDisconnect();
    } else {
      throw err;
    }
  });

  // Keep connection alive with periodic pings
  setInterval(() => {
    connection.query("SELECT 1", (err) => {
      if (err) console.error("Ping error:", err);
    });
  }, 30000); // Ping every 30 seconds
}

// Initial connection
handleDisconnect();

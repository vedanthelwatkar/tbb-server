import { pool } from "../db.js";

export const updateStatus = async (req, res) => {
  const { isActive } = req.body;

  if (typeof isActive !== "boolean" && ![0, 1].includes(isActive)) {
    return res.status(400).json({
      error: "Invalid status value",
      message: "isActive must be a boolean or 0/1",
    });
  }

  const statusValue = isActive ? 1 : 0;

  pool.getConnection((err, connection) => {
    if (err) {
      console.error("Connection error:", err);
      return res.status(500).json({
        error: "Database connection failed",
      });
    }

    connection.beginTransaction((err) => {
      if (err) {
        connection.release();
        return res.status(500).json({
          error: "Transaction start failed",
        });
      }

      const insertHistoryQuery = `
        INSERT INTO status_history (status) 
        VALUES (?)
      `;

      connection.query(
        insertHistoryQuery,
        [statusValue],
        (err, historyResult) => {
          if (err) {
            return connection.rollback(() => {
              connection.release();
              res.status(500).json({
                error: "Failed to record status history",
              });
            });
          }

          connection.commit((err) => {
            if (err) {
              return connection.rollback(() => {
                connection.release();
                res.status(500).json({
                  error: "Failed to commit transaction",
                });
              });
            }

            connection.release();
            res.status(200).json({
              success: true,
              message: statusValue
                ? "System activated successfully"
                : "System deactivated successfully",
              isActive: !!statusValue,
            });
          });
        }
      );
    });
  });
};

export const getStatus = (req, res) => {
  const query = `
    SELECT status as isActive 
    FROM status_history 
    ORDER BY created_at DESC
    LIMIT 1
  `;

  pool.query(query, (err, results) => {
    if (err) {
      return res.status(500).json({
        error: "Failed to fetch status",
        stack: err.stack,
      });
    }

    if (!results.length) {
      return res.status(404).json({
        error: "No status history found",
      });
    }

    return res.status(200).json({
      success: true,
      isActive: !!results[0].isActive,
    });
  });
};

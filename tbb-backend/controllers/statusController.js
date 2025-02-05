import { pool } from "../db.js";

export const updateStatus = async (req, res) => {
  const { isActive } = req.body;

  // Validate input
  if (typeof isActive !== "boolean" && ![0, 1].includes(isActive)) {
    return res.status(400).json({
      error: "Invalid status value",
      message: "isActive must be a boolean or 0/1",
    });
  }

  const statusValue = isActive ? 1 : 0;

  // Use a transaction to ensure both updates succeed or fail together
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

      // Update themes table
      const updateThemeQuery = `UPDATE themes SET isActive = ?`;

      connection.query(updateThemeQuery, [statusValue], (err, themeResult) => {
        if (err) {
          return connection.rollback(() => {
            connection.release();
            res.status(500).json({
              error: "Failed to update status",
            });
          });
        }

        // Insert into history table
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
  });
};

export const getStatus = (req, res) => {
  const query = `
    SELECT isActive 
    FROM themes 
    LIMIT 1
  `;

  pool.query(query, (err, results) => {
    if (err) {
      return res.status(500).json({
        error: "Failed to fetch status",
      });
    }

    if (!results.length) {
      return res.status(404).json({
        error: "No theme configuration found",
      });
    }

    return res.status(200).json({
      success: true,
      isActive: !!results[0].isActive,
    });
  });
};

export const getStatusHistory = (req, res) => {
  const query = `
    SELECT 
      status as isActive,
      changed_at as timestamp
    FROM status_history
    ORDER BY changed_at DESC
    LIMIT 100
  `;

  pool.query(query, (err, results) => {
    if (err) {
      return res.status(500).json({
        error: "Failed to fetch status history",
      });
    }

    return res.status(200).json({
      success: true,
      history: results.map((record) => ({
        ...record,
        isActive: !!record.isActive,
      })),
    });
  });
};

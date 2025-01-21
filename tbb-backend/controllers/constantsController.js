import { connection } from "../db.js";
import { defaultbrandTheme } from "../helper.js";

export const getConstants = (req, res) => {
  const isDashboard = req.query.dashboard;

  connection.query("SELECT * FROM themes", (err, results) => {
    if (err) {
      return res.status(500).json({ error: "Something went wrong", err });
    }

    const brandTheme = results ? results[0] : {};

    const data = isDashboard
      ? { brandTheme: { ...defaultbrandTheme } }
      : { brandTheme };

    res.json(data);
  });
};

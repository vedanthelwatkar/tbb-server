export const updateBranding = (req, res) => {
  const data = req.body;
  const {
    primary_color,
    secondary_color,
    tertiary_color,
    text_base_color,
    text_secondary_color,
    theme_font,
  } = data;

  const query = `UPDATE themes 
                  SET primary_color = ?, 
                      secondary_color = ?, 
                      tertiary_color = ?, 
                      text_base_color = ?,
                      text_secondary_color = ?,
                      theme_font = ?;`;

  pool.query(
    query,
    [
      primary_color,
      secondary_color,
      tertiary_color,
      text_base_color,
      text_secondary_color,
      theme_font,
    ],
    (err) => {
      if (err) {
        return res.status(500).json({ error: "Something went wrong", err });
      }

      return res.status(200).json({ message: "Branding updated successfully" });
    }
  );
};

import { connection } from "../db.js";

export const updateBranding = (req, res) => {
  const data = req.body;
  const primaryColor = connection.escape(data.primary_color);
  const secondaryColor = connection.escape(data.secondary_color);
  const tertiaryColor = connection.escape(data.tertiary_color);
  const textBaseColor = connection.escape(data.text_base_color);
  const textSecondaryColor = connection.escape(data.text_secondary_color);
  const theme_font = connection.escape(data.theme_font);

  const query = `UPDATE themes 
                  SET primary_color = ${primaryColor}, 
                  secondary_color = ${secondaryColor}, 
                  tertiary_color = ${tertiaryColor}, 
                  text_base_color = ${textBaseColor},
                  text_secondary_color=${textSecondaryColor},
                  theme_font = ${theme_font};`;

  connection.query(query, (err) => {
    if (err) {
      return res.status(500).json({ error: "Something went wrong", err });
    }

    return res.status(200).json({ message: "Branding updated successfully" });
  });
};

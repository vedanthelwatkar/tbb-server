import { connection } from "../db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const signin = (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .json({ message: "Username and password are required" });
  }

  connection.query(
    "SELECT * FROM users WHERE username = ? OR email = ?",
    [username, username],
    async (err, results) => {
      if (err) {
        console.error("Signin error:", err);
        return res.status(500).json({ message: "Internal server error", err });
      }

      if (results.length === 0) {
        return res
          .status(401)
          .json({ message: "Invalid username or password" });
      }

      const user = results[0];

      try {
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
          return res
            .status(401)
            .json({ message: "Invalid username or password" });
        }

        const token = jwt.sign(
          { id: user.id, username: user.username },
          process.env.JWT || "default_secret",
          { expiresIn: "1h" }
        );

        const { password: _, ...userData } = user;

        return res.status(200).json({
          message: "Sign in successful",
          user: userData,
          token,
        });
      } catch (error) {
        console.error("Password comparison error:", error);
        return res.status(500).json({ message: "Internal server error", err });
      }
    }
  );
};

export const signup = (req, res) => {
  const { username, password, email, name } = req.body;

  if (!username || !password || !email || !name) {
    return res.status(400).json({
      message: "All fields (username, password, email, name) are required",
    });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: "Invalid email format" });
  }

  if (password.length < 8) {
    return res.status(400).json({
      message: "Password must be at least 8 characters long",
    });
  }

  connection.query(
    "SELECT * FROM users WHERE username = ? OR email = ?",
    [username, email],
    async (err, results) => {
      if (err) {
        console.error("Signup error:", err);
        return res.status(500).json({ message: "Internal server error", err });
      }

      if (results.length > 0) {
        const existingUser = results[0];
        if (existingUser.username === username) {
          return res.status(409).json({ message: "Username already exists" });
        }
        if (existingUser.email === email) {
          return res.status(409).json({ message: "Email already exists" });
        }
      }

      try {
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        connection.query(
          `INSERT INTO users (username, password, email, name, created_at) 
           VALUES (?, ?, ?, ?, CURRENT_TIMESTAMP)`,
          [username, hashedPassword, email, name],
          (err, result) => {
            if (err) {
              console.error("User insertion error:", err);
              if (err.code === "23505") {
                return res
                  .status(409)
                  .json({ message: "Username or email already exists" });
              }
              return res
                .status(500)
                .json({ message: "Internal server error", err });
            }

            connection.query(
              "SELECT id, username, email, name, created_at FROM users WHERE id = ?",
              [result.insertId],
              (err, users) => {
                if (err) {
                  console.error("Error fetching new user:", err);
                  return res
                    .status(500)
                    .json({ message: "Internal server error" });
                }

                const newUser = users[0];

                return res.status(201).json({
                  message: "User created successfully",
                  user: newUser,
                });
              }
            );
          }
        );
      } catch (error) {
        console.error("Password hashing error:", error);
        return res.status(500).json({ message: error });
      }
    }
  );
};

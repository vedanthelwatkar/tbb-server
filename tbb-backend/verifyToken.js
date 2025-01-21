import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(403).json({ message: "Token Expired or Invalid" });
  }

  const token = authHeader.split(" ")[1];

  jwt.verify(token, process.env.JWT, (err, user) => {
    if (err) {
      return res
        .status(401)
        .json({ error: "Invalid token", details: err.stack });
    }

    req.user = user;
    next();
  });
};

import rateLimit from "express-rate-limit";

const rateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes in milliseconds
  max: 20, // Maximum of 20 requests in the 15-minute window
  skipSuccessfulRequests: true, // Skip successful requests from counting against the limit
});

export { rateLimiter };

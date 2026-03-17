const express = require("express");
const jwt = require("jsonwebtoken");
const users = require("./users");

const app = express();

app.use(express.json());

/* ---------- REQUEST LOGGER ---------- */
app.use((req, res, next) => {
  console.log(`[Auth Service] ${req.method} ${req.url}`);
  next();
});

/* ---------- HEALTH CHECK ---------- */
app.get("/", (req, res) => {
  res.json({
    service: "Identity Service",
    status: "running"
  });
});

/* ---------- LOGIN ---------- */
app.post("/login", (req, res) => {

  try {

    const { username, password } = req.body;

    /* Input validation */
    if (!username || !password) {
      return res.status(400).json({
        message: "Username and password are required"
      });
    }

    /* Find user */
    const user = users.find(
      u => u.username === username && u.password === password
    );

    if (!user) {
      return res.status(401).json({
        message: "Invalid credentials"
      });
    }

    /* Generate JWT */
    const token = jwt.sign(
      { id: user.id, role: user.role },
      "secretKey",
      { expiresIn: "1h" }
    );

    /* Remove password from response */
    const { password: _, ...safeUser } = user;

    res.json({
      message: "Login successful",
      user: safeUser,
      token
    });

  } catch (error) {

    console.error("Login error:", error);

    res.status(500).json({
      message: "Internal server error"
    });

  }

});

/* ---------- ERROR HANDLER ---------- */
app.use((err, req, res, next) => {

  console.error("Unhandled error:", err);

  res.status(500).json({
    message: "Something went wrong"
  });

});

/* ---------- START SERVER ---------- */
app.listen(5000, () => {
  console.log("Identity Service running on port 5000");
});
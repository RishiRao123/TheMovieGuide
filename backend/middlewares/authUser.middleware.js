  import jwt from "jsonwebtoken";

  const authUser = (req, res, next) => {
    try {
      const authHeader = req.headers.authorization;

      if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({
          message: "Authorization token missing or invalid",
          success: false,
        });
      }

      const token = authHeader.split(" ")[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      
      req.user = { id: decoded.id };  

      next();
    } catch (error) {
      res.status(401).json({
        message: "Unauthorized - Invalid token",
        success: false,
        error: error.message,
      });
    }
  };

  export default authUser;

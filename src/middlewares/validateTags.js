
export const parseTagsMiddleware = (req, res, next) => {
    if (req.body.tags) {
      try {
        req.body.tags = JSON.parse(req.body.tags);
      } catch (e) {
        return res.status(400).json({ error: "Invalid tags format" });
      }
    }
    next();
  };
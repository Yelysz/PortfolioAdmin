import app from "./app.js";
import { connectDB } from "./bd.js";
const PORT = process.env.PORT || 3000;

connectDB();
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
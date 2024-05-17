import app from "./app.js";
import { connectDB } from "./bd.js";
import dotenv from "dotenv";

dotenv.config();
const PORT = process.env.PORT || 3000;

async function main() {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

main();

import app from "./app.js";
import { connectDB } from "./bd.js";

connectDB();
app.listen(3000)
console.log('Server on port', 3000)
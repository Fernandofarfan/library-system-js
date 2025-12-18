import Express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/connection.js"; // Adjust path as necessary
import cors from "cors"
import bookRoutes from "./routes/book.js";
import authRoutes from "./routes/auth.js";
import reviewRoutes from "./routes/review.js";
import notFoundHandler from "./middlewares/not-found.js";

dotenv.config();


const app = Express();
app.use(cors());
app.use(Express.json());
app.use(Express.static("public"));


// routes
const baseURL = "/api/v1";
app.use(baseURL, authRoutes);
app.use(baseURL, bookRoutes);
app.use(baseURL, reviewRoutes);

// error handlers
app.use(notFoundHandler)

connectDB();

try {

    const port = 5000;
    app.listen(port, () => {
        console.log(`¡Servidor corriendo en el puerto ${port}!`);
        console.log(`Visita http://localhost:${port} para ver la biblioteca.`);
    });

} catch (error) {

    console.log(error);

}
const express = require("express");
const connectDB = require("./config/database");
const userRoutes = require("./routes/userRoutes");
const { notFound, errorHandler } = require("./middlewares/errorMiddleware");

const app = express();
connectDB();
app.use(express.json());

app.use('/api/users', userRoutes);

app.use(notFound);
app.use(errorHandler);

app.listen(5000, console.log(`Server started on PORT 5000`));
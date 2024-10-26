import mongoose from "mongoose";

export async function connect() {
  try {
    await mongoose.connect(process.env.DB_URL!);
    const connection = mongoose.connection;

    connection.on("connected", () => {
      console.log("Connected to MongoDB");
    });

    connection.on("error", (error) => {
      console.error(error);
      process.exit(1);
    });
  } catch (error) {
    console.error(error);
  }
}
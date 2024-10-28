import mongoose from "mongoose";

const connectToDB = async () => {
  try {
    const connectionToDB = await mongoose.connect(
      `${process.env.MONGO_URI}/calendar`
    );

    console.log("Connection : ", connectionToDB.connection.host);

    return connectionToDB;
  } catch (error) {
    console.log("Something went wrong while connecting to database: ", error);
    process.exit(1);
  }
};

export default connectToDB;

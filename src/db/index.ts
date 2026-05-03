import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(process.env.MONGODB_URI!);

    // Dekh, ye hi yaad karne wali baat hai bas. Mongoose saara ka saara connectionInstance ke andar aa gya. Ab connectionInstance ke andar object hai jo "connection" object hai. Ab on() ko access karne ke liye connectionInstance yaani ki Mongoose ke andar jaao, uske object ke andar jaao aur ab uski ek property on() ko access karo. Ya simple hai. BC Mongoose.connection() jo bhi hai, ise hi ek new variable me save kar de. Jaise ki "connection" ya "abc" kuch bhi aur isme wo direct access dede, kya? "connectionInstance.connection", ab ye "connectionInstance.connection.on" likhne ki jaroorat nahi hai. Ab direct jo variable liya hai, "abc", use hi "abc.on" ko access kar sakta hai. Ye hi samajhna hai bas.

    // const abc = connectionInstance.connection;

    // abc.on("connected", () => {
    // console.log(
    //  `MongoDB Connected! DB Host: ${abc.host}`,
    // );
    // });

    connectionInstance.connection.on("connected", () => {
      console.log(
        `MongoDB Connected! DB Host: ${connectionInstance.connection.host}`,
      );
    });
    connectionInstance.connection.on("error", (err) => {
      console.log(
        "MongoDB connected error. Please make sure MongoDB is running." + err,
      );
      process.exit();
    });
  } catch (error) {
    console.log("Something went wrong." + error);
  }
};

export default connectDB;

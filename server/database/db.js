import mongoose from "mongoose";

const Connection = async () => {
  const URL = `mongodb+srv://workingad512:ZexI40kUhXfFSc2p@cluster0.46wki.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
  try {
    await mongoose.connect(URL);
    console.log("DB Connected");
  } catch (error) {
    console.log("Error while connection db", error);
  }
};

export default Connection;

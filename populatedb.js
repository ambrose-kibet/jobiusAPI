const connectDb = require("./Connect/connectDB");
const Jobs = require("./Models/jobsModel");
const jobData = require("./jobs.json");
const populateDb = async () => {
  try {
    await connectDb("");
    await Jobs.deleteMany();
    await Jobs.create(jobData);
    console.log("Created");
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
populateDb();

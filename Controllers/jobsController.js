const Job = require("../Models/jobsModel");
const CustomErrors = require("../Errors");
const { StatusCodes, OK } = require("http-status-codes");
const checkPermissions = require("../Utils/checkPermissions");
const mongoose = require("mongoose");
const moment = require("moment");
const createJob = async (req, res) => {
  req.body.user = req.user.userId;
  const job = await Job.create(req.body);
  res.status(StatusCodes.CREATED).json({ job });
};
const getAllJobs = async (req, res) => {
  const { search, sort, status, type } = req.query;

  const objectQuery = {};
  if (search) {
    objectQuery.position = { $regex: search, $options: "i" };
  }
  if (status && status !== "all") {
    objectQuery.status = status;
  }
  if (type && type !== "all") {
    objectQuery.jobType = type;
  }
  let result = Job.find({ user: req.user.userId, ...objectQuery });
  if (sort === "oldest") {
    result = result.sort("createdAt");
  }
  if (sort === "latest") {
    result = result.sort("-createdAt");
  }
  if (sort === "a-z") {
    result = result.sort("position");
  }
  if (sort && sort === "z-a") {
    result = result.sort("-position");
  }
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;
  result = result.skip(skip).limit(limit);
  const jobs = await result.select("-user");
  const totalJobs = await Job.countDocuments(objectQuery);
  const numOfPages = Math.ceil(totalJobs / limit);
  res.status(StatusCodes.OK).json({ jobs, totalJobs, numOfPages });
};
const getSingleJob = async (req, res) => {
  const { id: jobId } = req.params;
  const job = await Job.findOne({ _id: jobId }).select("-user");
  checkPermissions(req.user, job.user);
  res.status(StatusCodes.OK).json({ job });
};
const updateJob = async (req, res) => {
  const { company, position, status, jobType, jobLocation } = req.body;
  const { id: jobId } = req.params;
  if (!company || !position || !status || !jobType || !jobLocation) {
    throw new CustomErrors.BadRequestError(
      "please provide company, positon ,jobType, jobLocation and status"
    );
  }
  const job = await Job.findOne({ _id: jobId });
  if (!job) {
    throw new CustomErrors.NotFoundError(`no job with id:${jobId}`);
  }
  job.status = status;
  job.position = position;
  job.status = status;
  job.jobType = jobType;
  job.jobLocation = jobLocation;

  await job.save();
  res.status(StatusCodes.OK).json({ job });
};
const deleteJob = async (req, res) => {
  const { id: jobId } = req.params;
  const job = await Job.findOneAndDelete({ _id: jobId });
  if (!job) {
    throw new CustomErrors.NotFoundError(`no job with id:${jobId}`);
  }
  res.status(StatusCodes.OK).json({ msg: "job deleted successfully" });
};
const showStats = async (req, res) => {
  let stats = await Job.aggregate([
    {
      $match: {
        user: mongoose.Types.ObjectId(req.user.userId),
      },
    },
    {
      $group: {
        _id: "$status",
        count: {
          $sum: 1,
        },
      },
    },
  ]);
  stats = stats.reduce((acc, curr) => {
    const { _id: title, count } = curr;
    acc[title] = count;
    return acc;
  }, {});
  let defaultStats = {
    declined: stats.declined || 0,
    interview: stats.interview || 0,
    pending: stats.pending || 0,
  };
  let monthlyApplications = await Job.aggregate([
    {
      $match: {
        user: mongoose.Types.ObjectId(req.user.userId),
      },
    },
    {
      $group: {
        _id: {
          year: {
            $year: "$createdAt",
          },
          month: {
            $month: "$createdAt",
          },
        },
        count: {
          $sum: 1,
        },
      },
    },
    {
      $sort: {
        "_id.year": -1,
        "_id.month": -1,
      },
    },
    { $limit: 6 },
  ]);
  monthlyApplications = monthlyApplications
    .map((item) => {
      const {
        _id: { year, month },
        count,
      } = item;
      const date = moment()
        .month(month - 1)
        .year(year)
        .format("MMM Y");
      return { date, count };
    })
    .reverse();

  res.status(StatusCodes.OK).json({ defaultStats, monthlyApplications });
};
module.exports = {
  createJob,
  getAllJobs,
  getSingleJob,
  updateJob,
  deleteJob,
  showStats,
};

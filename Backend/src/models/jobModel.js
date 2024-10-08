import { model, Schema } from "mongoose";

const jobPostSchema = new Schema(
  {
    companyName: {
      type: String,
      trim: true,
      required: true,
    },

    jobTitle: {
      type: String,
      trim: true,
      required: true,
    },

    jobDescription: {
      type: String,
      trim: true,
    },

    responsibilities: {
      type: String,
      trim: true,
      required: true,
    },

    skills: {
      type: String,
      trim: true,
      required: true,
    },

    education: {
      type: String,
      trim: true,
      required: true,
    },

    experience: {
      type: String,
      trim: true,
      required: true,
    },

    salary: {
      type: String,
      trim: true,
      required: true,
    },

    employmentStatus: {
      type: String,
      trim: true,
      required: true,
    },

    category : {
      type : Schema.Types.ObjectId,
      ref : "Category",
      required : [true, "category must be provided"]
    },

    applicationProcessType : {
      type : String,
      enum : ["link", "email"]
    },

    applicationProcess: {
      type: String,
      trim: true,
      required: true,
    },
  },
  { timestamps: true }
);

const JobPost = model("JobPost", jobPostSchema);

export default JobPost;

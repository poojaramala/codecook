import mongoose, { Schema } from "mongoose";

const TestCaseSchema = new Schema(
  {
    input: {
      type: String, // you can store raw input as string (e.g. "5\n1 2 3 4 5")
      required: true,
    },
    expectedOutput: {
      type: String, // expected result as string (e.g. "9")
      required: true,
    },
    explanation: {
      type: String, // optional explanation for that test
      default: "",
    },
    isSample: {
      type: Boolean, // true: show in problem description; false: hidden test case
      default: false,
    },
  },
  { _id: false } // no separate _id for each test case, optional
);

const ProblemSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    // Slug used in URL and as a stable unique identifier
    slug: {
      type: String,
      required: true,
      unique: true,
      index: true,
      trim: true,
      lowercase: true,
    },

    description: {
      type: String, // full problem statement
      required: true,
    },

    // Example: "Easy", "Medium", "Hard"
    difficulty: {
      type: String,
      enum: ["Easy", "Medium", "Hard"],
      default: "Easy",
    },

    // Example: "Array", "String", "Dynamic Programming", "Graph"
    category: {
      type: String,
      required: true,
      trim: true,
    },

    // Main language for the official solution (your choice)
    language: {
      type: String, // "java", "javascript", "python", etc.
      default: "java",
      lowercase: true,
      trim: true,
    },

    // Tags / patterns for filtering (optional)
    patterns: [
      {
        type: String, // "two pointers", "sliding window", "hash map" etc.
        trim: true,
      },
    ],

    // I/O format details (optional but nice)
    inputFormat: {
      type: String,
      default: "",
    },
    outputFormat: {
      type: String,
      default: "",
    },

    // Test cases: sample + hidden
    testCases: {
      type: [TestCaseSchema],
      default: [],
    },

    // Your reference answer / solution code
    answer: {
      type: String, // store official solution code in the chosen language
      default: "",
    },

    // Optional: starter code templates for different languages
    starterCode: {
      type: Map,
      of: String, // e.g. { "java": "class Solution { ... }" }
      default: {},
    },

    // Optional: external site info (if you link to LeetCode, GFG, etc.)
    platform: {
      type: String,
      default: "",
      trim: true,
    },
    link: {
      type: String,
      default: "",
      trim: true,
    },
  },
  {
    timestamps: true, // createdAt, updatedAt
  }
);

// Avoid model overwrite error in Next.js dev
const Problem =
  mongoose.models.Problem || mongoose.model("Problem", ProblemSchema);

export default Problem;

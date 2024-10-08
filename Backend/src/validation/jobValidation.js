
"use strict";

import { body } from "express-validator";

export const validateJobPost = [

    body("companyName")
        .trim()
        .notEmpty()
        .withMessage("please provide a company name"),

    body("jobTitle")
        .trim()
        .notEmpty()
        .withMessage("please provide a job Title"),
        
    body("jobDescription")
        .trim(),
        
    body("responsibilities")
        .trim()
        .notEmpty()
        .withMessage("please provide Responsibilities"),
        
    body("skills")
        .trim()
        .notEmpty()
        .withMessage("please provide skills"),


    body("education")
        .trim()
        .notEmpty()
        .withMessage("please provide education"),
    
    body("experience")
        .trim()
        .notEmpty()
        .withMessage("please provide a expereince"),

    body("salary")
        .trim()
        .notEmpty()
        .withMessage("please provide a salary"),
    
    body("employmentStatus")
       .trim()
       .notEmpty()
       .withMessage("please provide employment status"),

    body("category")
       .trim()
       .notEmpty()
       .withMessage("please provide categoy for this job"),
       
    body("applicationProcessType")
       .trim()
       .notEmpty()
       .withMessage("please provide application process type")
       .isIn(["link", "email"])
       .withMessage("application process type must be either 'link' or 'email'"),

    body("applicationProcess")
        .trim()
        .notEmpty()
        .withMessage("Please provide a Application process")

]
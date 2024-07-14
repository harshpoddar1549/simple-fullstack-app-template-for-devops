import { NextFunction, Request, Response } from "express";
import mongoose, { ConnectOptions } from "mongoose";

export const connectToDb = async () => {
    return await mongoose.connect(`mongodb://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_CONTAINER_ENDPOINT}`, {
        dbName: process.env.DB_NAME
    })
}
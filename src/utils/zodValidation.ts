import express, { Request, Response, NextFunction } from "express";
import { z, AnyZodObject } from "zod";

const validateRequestBody = (schema: AnyZodObject) =>
    async (request: Request, response: Response, next: NextFunction) => {
        try {
            await schema.parseAsync(request.body);
            return next();
        } catch (error) {
            return response.status(400).json(error);
        }
    }

export {
    validateRequestBody
}
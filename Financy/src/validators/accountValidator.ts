import Joi from "joi";

export const createAccountSchema = Joi.object({
    name: Joi.string().min(3).max(255).required(),
    description: Joi.string().allow(null, "").max(1000),
    value: Joi.number().positive().required(),
    dueDate: Joi.date().iso().required(),
});

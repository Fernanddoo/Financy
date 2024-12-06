import Joi from 'joi';

export const updateAccountSchema = Joi.object({
  name: Joi.string().optional(),
  description: Joi.string().optional().allow(''),
  value: Joi.number().optional(),
  dueDate: Joi.date().optional(),
  paid: Joi.boolean().optional(),
});

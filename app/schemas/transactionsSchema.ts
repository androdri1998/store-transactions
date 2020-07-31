import Joi from '@hapi/joi';

const createTransaction = {
  body: Joi.object({
    title: Joi.string().min(1).required(),
    value: Joi.number().integer().required(),
    type: Joi.string().valid('outcome', 'income').required(),
  }),
};

export default createTransaction;

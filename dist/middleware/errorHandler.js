import { ErrorResponse } from '../utils/error_response.utils.js';
import { MongoError } from 'mongodb';
import { Error as MongooseError } from 'mongoose';
export const errorHandler = (err, req, res, next) => {
    if (err instanceof MongoError && err.code === 11000) {
        const message = 'Duplicate field value entered';
        const errorResponse = new ErrorResponse(400, message);
        return errorResponse.send(res);
    }
    if (err instanceof MongooseError.ValidationError) {
        const message = Object.values(err.errors)
            .map((error) => error.message)
            .join(' & ');
        const errorResponse = new ErrorResponse(400, message);
        return errorResponse.send(res);
    }
    if (err instanceof ErrorResponse) {
        err.send(res);
    }
    else {
        new ErrorResponse(500, 'Internal Server Error').send(res);
    }
};
//# sourceMappingURL=errorHandler.js.map
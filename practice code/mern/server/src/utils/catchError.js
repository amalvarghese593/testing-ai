const catchError = (fn) => {
  return async (req, res, next) => {
    return fn(req, res, next).catch((err) => next(err));
    // return Promise.resolve(fn(req, res, next)).catch((err) => next(err));
  };
};
module.exports = catchError;

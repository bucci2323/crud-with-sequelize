const {
  ForbiddenError,
  NotFoundError,
  UnauthorizedError,
  ValidationError,
} = require("./helper");

const errorHandler = (error, req, res, next) => {
  console.log("!!!!!!1");
  if (error instanceof UnauthorizedError) {
    console.log(error);

    res.status(401).json({ errors: { body: [error.message] } });
  } else if (error instanceof ForbiddenError) {
    console.log(error);

    res.status(403).json({ errors: { body: [error.message] } });
  } else if (error instanceof NotFoundError) {
    console.log(error);

    res.status(404).json({ errors: { body: [error.message] } });
  } else if (error instanceof ValidationError) {
    console.log(error);
    res.status(422).json({ errors: { body: [error.message] } });
  } else {
    console.log(error);
    res.status(500).json({ errors: { body: [error.message] } });
  }

  console.log("!!!!!1");
};

module.exports = errorHandler;

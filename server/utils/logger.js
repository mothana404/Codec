const { createLogger, format, transports } = require("winston");

const customFormat = format.combine(
  format.colorize(),
  format.timestamp(),
  format.printf(({ timestamp, level, message, ...meta }) => {
    return `${timestamp} ${level}: ${message} ${
      Object.keys(meta).length ? JSON.stringify(meta, null, 2) : ""
    }`;
  })
);

const customLevels = {
    levels: {
      critical: 0,
      error: 1, // For unexpected errors.
      warn: 2, // For non-critical issues
      info: 3, // For general application events
      debug: 4
    },
    colors: {
      critical: 'red',
      error: 'red',
      warn: 'yellow',
      info: 'green',
      debug: 'blue'
    }
  };

const logger = createLogger({
  levels: customLevels,
  level: "info",
  format: customFormat,
  transports: [
    new transports.Console(),
    new transports.File({ filename: "app.log" }),
  ],
});

module.exports = logger;

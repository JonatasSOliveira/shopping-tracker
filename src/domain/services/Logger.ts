import chalk from "chalk";

export enum LogLevel {
  DEBUG = "DEBUG",
  INFO = "INFO",
  WARN = "WARN",
  ERROR = "ERROR",
}

export class Logger {
  static async log(level: LogLevel, message: string, context?: unknown) {
    const timestamp = new Date().toISOString();
    const formattedMessage = `[${timestamp}] [${level}]${context ? ` [${context}]` : ""}: ${message}`;
    switch (level) {
      case LogLevel.INFO:
        console.log(chalk.blue(formattedMessage));
        break;
      case LogLevel.WARN:
        console.warn(chalk.yellow(formattedMessage));
        break;
      case LogLevel.ERROR:
        console.error(chalk.red(formattedMessage));
        break;
      case LogLevel.DEBUG:
        console.debug(chalk.gray(formattedMessage));
        break;
      default:
        console.log(formattedMessage);
    }
  }
}

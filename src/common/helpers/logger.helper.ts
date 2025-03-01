import { Logger } from '@nestjs/common';
import * as dateHelper from './date.helper';

const logger = new Logger();

export const log = (message: string | null = null) => {
    logger.log(`[${dateHelper.getDateNow()}] <> ${message}`);
};

export const verbose = (message: string | null = null) => {
    logger.verbose(`[${dateHelper.getDateNow()}] <> ${message}`);
};

export const warn = (message: string | null = null) => {
    logger.warn(`[${dateHelper.getDateNow()}] <> ${message}`);
};

export const error = (error: string | null = null, message: Error | string | null = null) => {
    logger.error(`[${dateHelper.getDateNow()}] <> ${error}:${message}`);
};

import { env } from "./environment";

export const isDevelopment = (): boolean => {
    return env('NODE_ENV') === 'development';
}

export const isTesting = (): boolean => {
    return env('NODE_ENV') === 'testing';
}

export const isProduction = (): boolean => {
    return env('NODE_ENV') === 'production';
}

export const getMode = (): string => {
    return env('NODE_ENV');
}
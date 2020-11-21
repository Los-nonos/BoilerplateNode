import {env} from "./environment";

const configValues = {
    jwt: {
        secret: env('JWT_SECRET'),
        expirationTime: env('JWT_EXPIRATION_TIME')
    },
    database: {
        credentials: {
            username: env("DATABASE_USER", "root"),
            password: env("DATABASE_PASSWORD", "secret"),
        },
        host: env("DATABASE_HOST","mysql"),
        migration_table: 'migrations',
        port: env('DATABASE_PORT'),
        database: env('DATABASE_NAME'),
    },
    redis: {
        port: env('REDIS_PORT', '6938'),
        host: env('REDIS_HOST', "localhost"),
    },
}


/**
 *
 * @param route
 * @param defaultValue
 */
export const config = (route: string, defaultValue: string = null): string => {
    let finalValue = defaultValue;
    if(route.includes('.'))
    {
        const values = route.split('.');
        values.forEach((value, key) => {
            finalValue = key == 0 ? configValues[value] : finalValue[value];
        });
    }else {
        finalValue = configValues[route];
    }

    if(typeof finalValue !== "string")
    {
        throw new Error('Config value isn\'t string');
    }
    else{
        return finalValue ? finalValue : defaultValue;
    }
}
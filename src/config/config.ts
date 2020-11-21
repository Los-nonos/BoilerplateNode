const configValues = {
  jwt: {
    secret: process.env.JWT_SECRET,
    expirationTime: process.env.JWT_EXPIRATION_TIME,
  },
  database: {
    credentials: {
      username: process.env.DATABASE_USER,
      password:
        process.env
          .DATABASE_PASSWORD /*? process.env.DATABASE_PASSWORD : 'secret'*/,
    },
    host: process.env.DATABASE_HOST ?? "127.0.0.1",
    migration_table: "migrations",
    port: process.env.DATABASE_PORT ?? "3306",
    database: process.env.DATABASE_NAME ?? "database",
  },
  redis: {
    port: process.env.REDIS_PORT ?? "6938",
    host: process.env.REDIS_HOST ?? "127.0.0.1",
  },
};

/**
 *
 * @param route
 * @param defaultValue
 */
export const config = (route: string, defaultValue: string = null): string => {
  let finalValue = defaultValue;
  if (route.includes(".")) {
    const values = route.split(".");
    values.forEach((value, key) => {
      console.log(value);
      console.log(finalValue);
      finalValue = key == 0 ? configValues[value] : finalValue[value];
    });
  } else {
    finalValue = configValues[route];
  }

  if (typeof finalValue !== "string") {
    console.log(typeof finalValue);
    console.log(route);
    throw new Error("Config value isn't string");
  } else {
    return finalValue ? finalValue : defaultValue;
  }
};

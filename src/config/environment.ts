export const env = (value, defaultValue = null) => {
    const environmentValue = process.env[value];
    return environmentValue ? environmentValue : defaultValue;
  }
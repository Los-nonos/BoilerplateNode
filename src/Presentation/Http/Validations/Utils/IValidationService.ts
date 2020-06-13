export default interface IValidator {
    validate(data: any, schema: any);
    validationResult(errors: any);
  }
  
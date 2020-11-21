export interface ValidationService {
    validate(data: any, schema: any);
    validationResult(errors: any);
}
  
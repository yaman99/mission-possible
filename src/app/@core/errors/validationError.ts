import { ErrorContext } from './errorContext';

export class ValidationError {
  public errors: string[] = [];

  constructor(error: any) {
    this.ValidationMessage(error.errors);
  }
  private ValidationMessage(erros:any) {
    Object.values<string[]>(erros).forEach((x) => {
      x.forEach((y) => {
        this.errors.push(y);
      });
    });
  }
}

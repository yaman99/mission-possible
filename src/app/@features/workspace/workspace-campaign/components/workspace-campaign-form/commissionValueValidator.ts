import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function validateCommissionValue(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const commissionType = control.get('type')?.value;
    const commissionValue = control.get('value')?.value;
    if (commissionValue) {
      if (commissionType == 'percentage') {
        if (commissionValue < 5) {
          control.get('value')?.setErrors({ PercentageLow: true });
          return { PercentageLow: { value: control.value } };
        }
      } else {
        if (commissionValue < 10) {
          control.get('value')?.setErrors({ PriceLow: true });
          return { PriceLow: { value: control.value } };
        }
      }
    }
    return null;
  };
}

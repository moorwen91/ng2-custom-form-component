import {
  AbstractControl,
  ControlValueAccessor,
  FormGroup,
  NgControl,
  ValidationErrors,
  Validator
} from '@angular/forms';
import { Subject } from 'rxjs';
import { DoCheck, OnDestroy, OnInit, Component } from '@angular/core';
import { takeUntil } from 'rxjs/operators';

@Component({ template: '' })
export abstract class AbstractCustomFormComponent implements OnInit, DoCheck, OnDestroy, ControlValueAccessor, Validator {
  form: FormGroup;
  onTouched: any;
  protected destroyed$: Subject<void>;
  protected touched: boolean;

  protected constructor(protected ngControl: NgControl) {
    this.destroyed$ = new Subject<void>();
    this.ngControl.valueAccessor = this;
  }

  ngOnInit(): void {
    this.ngControl.control.setValidators([this.validate.bind(this)]);
    this.ngControl.control.updateValueAndValidity();

    this.touched = this.ngControl && this.ngControl.touched;
  }

  ngDoCheck(): void {
    const newValue = this.ngControl && this.ngControl.touched;
    if (this.touched !== newValue) {
      this.touched = newValue;
      this.touched ? this.form.markAllAsTouched() : this.form.markAsUntouched({ onlySelf: true });
    }
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  registerOnChange(fn: any): void {
    this.form.valueChanges.pipe(takeUntil(this.destroyed$)).subscribe(fn);
    setTimeout(() => fn(this.form.value), 0);
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    isDisabled ? this.form.disable({ emitEvent: false }) : this.form.enable();
  }

  writeValue(value: any): void {
    if (value) {
      this.form.patchValue(value);
    } else {
      this.form.reset();
    }
  }

  registerOnValidatorChange(fn: () => void): void {
    this.form.statusChanges.pipe(takeUntil(this.destroyed$)).subscribe(fn);
  }

  validate(_: AbstractControl): ValidationErrors | null {
    if (this.form.valid) {
      return null;
    }

    const errors = {};
    Object.keys(this.form.controls).forEach((key) => {
      const controlErrors: ValidationErrors = this.form.get(key).errors;
      if (controlErrors) {
        errors[key] = controlErrors;
      }
    });
    return errors;
  }
}

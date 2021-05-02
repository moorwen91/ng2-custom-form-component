# Ng2CustomFormComponent

Just an implementation of `ControlValueAccessor` to avoid repeating myself.

## Example

Supose you have a `PersonFormComponent` form wich repeats constantly in your app and it contains some personal data like:
* firstName
* lastName
* email
* phone

It may looks like:
```html
<ng-container [formGroup]="form">
  <mat-form-field class="w-100">
    <mat-label>First name</mat-label>
    <input matInput appFieldErrors formControlName="firstName" placeholder="First name" />
  </mat-form-field>

  <mat-form-field class="w-100">
    <mat-label>Last name</mat-label>
    <input matInput appFieldErrors formControlName="lastName" placeholder="Last name" />
  </mat-form-field>

  <mat-form-field class="w-100">
    <mat-label>Email</mat-label>
    <input matInput appFieldErrors formControlName="email" type="email" placeholder="Email" />
  </mat-form-field>

  <mat-form-field class="w-100">
    <mat-label>Phone</mat-label>
    <input matInput appFieldErrors formControlName="phone" placeholder="Phone" />
  </mat-form-field>
</ng-container>
```
```ts
import { Component, Self } from '@angular/core';
import { FormBuilder, NgControl, Validators } from '@angular/forms';
import { AbstractCustomFormComponent } from 'ng2-custom-form-component';

@Component({
  selector: 'app-person-form',
  templateUrl: './person-form.component.html',
  styleUrls: ['./person-form.component.sass']
})
export class PersonFormComponent extends AbstractCustomFormComponent {
  constructor(fb: FormBuilder, @Self() control: NgControl) {
    super(control);

    this.form = fb.group({
      firstName: [null, [Validators.required, Validators.maxLength(255)]],
      lastName: [null, [Validators.maxLength(255)]],
      email: [null, [Validators.required, Validators.maxLength(255), Validators.email]],
      phone: [null, [Validators.maxLength(14), Validators.pattern(/^\(\d{3}\) \d{3}-\d{4}$/i)]]
    });
  }
}
```

By extending from `AbstractCustomFormComponent` this `PersonFormComponent` can by reused as follow in an example `CustomerFormComponent`:
```html
<form [formGroup]="form" (ngSubmit)="onSubmit($event)" novalidate>
  <div class="row">
    <div class="col-md-12 col-lg-6">
      <app-person-form formControlName="person"></app-person-form>

      <mat-form-field class="w-100">
        <mat-label>Company name</mat-label>
        <input matInput appFieldErrors placeholder="Company name" formControlName="companyName" />
      </mat-form-field>

      <mat-form-field class="w-100">
        <mat-label>Website URL</mat-label>
        <input matInput appFieldErrors placeholder="Website URL" formControlName="websiteUrl" />
      </mat-form-field>
    </div>
  </div>

  <button type="submit" hidden class="d-none"></button>
</form>
```

```ts
@Component({
  selector: 'app-customer-form',
  templateUrl: './customer-form.component.html',
  styleUrls: ['./customer-form.component.sass']
})
export class CustomerFormComponent implements OnChanges  {
  constructor(private fb: FormBuilder, private apollo: Apollo) {
    this.form = this.fb.group({
      id: [],
      person: [],
      companyName: [null, [Validators.maxLength(255)]],
      websiteUrl: [null, [urlValidator()]]
    });
  }
}
```

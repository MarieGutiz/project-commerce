import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { ValidationErrorComponent } from '@ngx-validate/core';

@Component({
  selector: 'app-error',
  template: `<div
    class="invalid-feedback font-weight-bold"
    *ngFor="let error of errors; trackBy: trackByFn"
  >{{ error.message }} </div>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class ErrorComponent extends ValidationErrorComponent {}

import {AbstractControl, NG_VALIDATORS, Validator} from '@angular/forms';
import {Directive, Input} from '@angular/core';

@Directive({
  selector: '[restrictTo]',
  providers: [
    {provide: NG_VALIDATORS, useExisting: TypeAmountValidatorDirective, multi: true}
  ]
})
export class TypeAmountValidatorDirective implements Validator {
  @Input()
  restrictTo: string;

  validate (control: AbstractControl): { [key: string]: any; } {
    var type = "";
    var amount = 0;
    if (Number(this.restrictTo) == NaN && (this.restrictTo == 'Leisure' ||
                                    this.restrictTo == 'Education' ||
                                    this.restrictTo == 'Insurance' ||
                                    this.restrictTo == 'Education')) {
      type = this.restrictTo;
      amount = control.value;
    } else if (Number(this.restrictTo) != NaN){
      type = control.value;
      amount = parseInt(this.restrictTo);
    }
    if (type == 'Leisure' && amount > 300) {
      return {'restrictTo': true};
    }
    if (type == 'Education' && amount > 400) {
      return {'restrictTo': true};
    }
    return {'restrictTo': false};
  }

  /**
   * Not used.
   */
  registerOnValidatorChange (fn: () => void): void {
  }
}

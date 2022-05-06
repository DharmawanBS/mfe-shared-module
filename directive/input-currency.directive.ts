import { formatNumber } from '@angular/common';
import { Directive, ElementRef, HostListener, OnInit } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[appInputCurrency]',
})
export class InputCurrencyDirective implements OnInit {
  initialValue!: number;
  element!: HTMLInputElement;
  isInit = true;
  isInputSeparator = false;
  isSelectDecimal = false;

  constructor(element: ElementRef, private ngControl: NgControl) {
    this.element = element.nativeElement;
  }

  ngOnInit(): void {
    if (this.ngControl.control?.value) {
      this.initialValue = this.ngControl.control?.value?.toFixed(2);
    }
    if (this.ngControl.control) {
      this.updateValue();
    }
  }

  @HostListener('keypress', ['$event'])
  onKeyPress(e: KeyboardEvent): void {
    const regex = /^[0-9|,.]$/;

    this.element = e.target as HTMLInputElement;

    if (e.key === '.') {
      e.preventDefault();
    }

    if (e.key === ',' && this.element.value.includes(',')) {
      e.preventDefault();
    }

    this.element.setAttribute('autocomplete', 'off');
    if (!regex.test(e.key) || e.key === 'backspace') {
      e.preventDefault();
    } else {
      this.isInputSeparator = /^[,|.]$/.test(e.key);
      if (/^[\d]$/.test(e.key) &&
        parseFloat(
          (this.element.value + e.key)
            .replace(/[^0-9|,]+/g, '')
            .replace(',', '.')
        ) > 9999999999999.99
      ) {
        e.preventDefault();
      }
    }
  }

  @HostListener('blur', ['$event'])
  onBlur(_: KeyboardEvent): void {
    const value =
      this.element.value &&
      this.element.value.replace(/[^0-9|,]+/g, '').replace(',', '.');

    if (value !== '') {
      const valueAsNumber = formatNumber(Number(value), 'id', '1.2-2');
      this.ngControl?.valueAccessor.writeValue(valueAsNumber);
    }
  }

  @HostListener('ngModelChange', ['$event'])
  onModelChange(event: any): void {
    this.isInit = false; // FIX: become infinite symbol when backspace if has initial value using ngModel
    if (typeof event === 'number') {
      this.element.value = formatNumber(
        Number(this.element.value),
        'id',
        '1.2-2'
      );
    }
    this.updateValue();
  }

  updateValue(): void {
    if (this.isInputSeparator) { return; }

    const valuePattern = this.isInit ? /[^0-9|,.]+/g : /[^0-9|,]+/g;
    const value = this.element.value &&
      this.element.value.replace(valuePattern, '').replace(',', '.');

    if (!value || value === '') {
      this.ngControl?.valueAccessor.writeValue(null);
      return;
    }

    const hasComma = value.includes('.');
    const initialValue = this.isInit ? 2 : 0;
    const fractionalDigits = hasComma
      ? value.split('.')[1].length
      : initialValue;

    const pattern = hasComma
      ? `1.${this.limitToTwoDigit(fractionalDigits)}-${this.limitToTwoDigit(
          fractionalDigits
        )}`
      : '1.0-0';

    const valueAsNumber = formatNumber(Number(value), 'id', pattern);
    this.ngControl?.valueAccessor.writeValue(valueAsNumber);

    if (this.isInit && this.initialValue) {
      this.onBlur(new KeyboardEvent('blur'));
    }
    this.isInit = false;
  }

  limitToTwoDigit(value: number): number {
    return value > 2 ? 2 : value;
  }
}

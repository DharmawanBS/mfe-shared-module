import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';
import { NG_VALUE_ACCESSOR, NG_VALIDATORS, ControlValueAccessor, Validator, AbstractControl } from '@angular/forms';

@Directive({
  selector: '[appInputCurrency]',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: InputAvoidSymbolDirective,
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: InputAvoidSymbolDirective,
      multi: true,
    },
  ],
})
export class InputAvoidSymbolDirective implements ControlValueAccessor, Validator {
  private regex = /[`^~"']/g;

  @HostListener('blur', ['$event'])
  onBlur = () => {
    // do nothing
  }

  @HostListener('input', ['$event'])
  onChange = (_: InputEvent) => {
    // do nothing
  }

  constructor(private elRef: ElementRef<HTMLInputElement>,
              private renderer: Renderer2) {}

  writeValue(value: string): void {
    this.renderer.setProperty(this.elRef.nativeElement, 'value', value);
  }

  registerOnTouched(fn: () => void): void {
    this.onBlur = fn;
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = (ev: InputEvent) => {
      const value = this.trimValue((ev.target as any).value);
      this.writeValue(value);
      fn(value);
    };
  }

  validate(control: AbstractControl): object {
    return this.regex.test(control.value) ? { allowedSymbol: '|@#$%&*()_+-=!{}[];:,./<>?' } : null;
  }

  trimValue(value: string): string {
    return value.replace(this.regex, '');
  }
}

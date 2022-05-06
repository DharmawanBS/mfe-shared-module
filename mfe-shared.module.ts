import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedFullPageLoaderComponent } from './component/loader/shared-full-page-loader/shared-full-page-loader.component';
import { SharedTableLoaderComponent } from './component/loader/shared-table-loader/shared-table-loader.component';
import {InputAvoidSymbolDirective} from './directive/input-avoid-symbol.directive';
import {InputCurrencyDirective} from './directive/input-currency.directive';

const sharedComponents = [
  SharedFullPageLoaderComponent,
  SharedTableLoaderComponent,
];

const sharedDirectives = [
  InputAvoidSymbolDirective,
  InputCurrencyDirective,
];

@NgModule({
  declarations: [
    sharedComponents,
    sharedDirectives,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    sharedComponents,
    sharedDirectives,
  ]
})
export class MfeSharedModule { }

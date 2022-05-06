import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedFullPageLoaderComponent } from './component/loader/shared-full-page-loader/shared-full-page-loader.component';
import { SharedTableLoaderComponent } from './component/loader/shared-table-loader/shared-table-loader.component';

const sharedComponents = [
  SharedFullPageLoaderComponent,
  SharedTableLoaderComponent,
];

@NgModule({
  declarations: [
    sharedComponents,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    sharedComponents,
  ]
})
export class MfeSharedModule { }

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedTableLoaderComponent } from './shared-table-loader.component';

describe('SharedTableLoaderComponent', () => {
  let component: SharedTableLoaderComponent;
  let fixture: ComponentFixture<SharedTableLoaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SharedTableLoaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SharedTableLoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

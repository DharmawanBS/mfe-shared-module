import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedFullPageLoaderComponent } from './shared-full-page-loader.component';

describe('SharedFullPageLoaderComponent', () => {
  let component: SharedFullPageLoaderComponent;
  let fixture: ComponentFixture<SharedFullPageLoaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SharedFullPageLoaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SharedFullPageLoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HealpAndSupportPage } from './healp-and-support.page';

describe('HealpAndSupportPage', () => {
  let component: HealpAndSupportPage;
  let fixture: ComponentFixture<HealpAndSupportPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(HealpAndSupportPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

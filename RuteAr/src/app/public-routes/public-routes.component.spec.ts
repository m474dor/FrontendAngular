import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicRoutesComponent } from './public-routes.component';

describe('PublicRoutesComponent', () => {
  let component: PublicRoutesComponent;
  let fixture: ComponentFixture<PublicRoutesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PublicRoutesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PublicRoutesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

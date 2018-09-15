import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateRouteComponent } from './update-route.component';

describe('UpdateRouteComponent', () => {
  let component: UpdateRouteComponent;
  let fixture: ComponentFixture<UpdateRouteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateRouteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateRouteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

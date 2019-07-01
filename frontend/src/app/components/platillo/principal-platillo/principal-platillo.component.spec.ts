import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrincipalPlatilloComponent } from './principal-platillo.component';

describe('PrincipalPlatilloComponent', () => {
  let component: PrincipalPlatilloComponent;
  let fixture: ComponentFixture<PrincipalPlatilloComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrincipalPlatilloComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrincipalPlatilloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

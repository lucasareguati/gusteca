import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlatilloComponent } from './platillo.component';

describe('PlatilloComponent', () => {
  let component: PlatilloComponent;
  let fixture: ComponentFixture<PlatilloComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlatilloComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlatilloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

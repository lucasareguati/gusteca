import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CargarPlatilloComponent } from './cargar-platillo.component';

describe('CargarPlatilloComponent', () => {
  let component: CargarPlatilloComponent;
  let fixture: ComponentFixture<CargarPlatilloComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CargarPlatilloComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CargarPlatilloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetallePlatilloComponent } from './detalle-platillo.component';

describe('DetallePlatilloComponent', () => {
  let component: DetallePlatilloComponent;
  let fixture: ComponentFixture<DetallePlatilloComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetallePlatilloComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetallePlatilloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarPlatilloComponent } from './editar-platillo.component';

describe('EditarPlatilloComponent', () => {
  let component: EditarPlatilloComponent;
  let fixture: ComponentFixture<EditarPlatilloComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditarPlatilloComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarPlatilloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

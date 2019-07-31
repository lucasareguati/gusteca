import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HithatComponent } from './hithat.component';

describe('HithatComponent', () => {
  let component: HithatComponent;
  let fixture: ComponentFixture<HithatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HithatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HithatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

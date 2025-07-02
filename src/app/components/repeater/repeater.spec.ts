import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Repeater } from './repeater';

describe('Repeater', () => {
  let component: Repeater;
  let fixture: ComponentFixture<Repeater>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Repeater]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Repeater);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

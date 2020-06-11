import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EdicaoCorComponent } from './edicao-cor.component';

describe('EdicaoCorComponent', () => {
  let component: EdicaoCorComponent;
  let fixture: ComponentFixture<EdicaoCorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EdicaoCorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EdicaoCorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

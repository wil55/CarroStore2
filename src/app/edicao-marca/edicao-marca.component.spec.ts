import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EdicaoMarcaComponent } from './edicao-marca.component';

describe('EdicaoMarcaComponent', () => {
  let component: EdicaoMarcaComponent;
  let fixture: ComponentFixture<EdicaoMarcaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EdicaoMarcaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EdicaoMarcaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

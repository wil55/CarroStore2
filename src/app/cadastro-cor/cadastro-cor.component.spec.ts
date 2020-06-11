import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastroCorComponent } from './cadastro-cor.component';

describe('CadastroCorComponent', () => {
  let component: CadastroCorComponent;
  let fixture: ComponentFixture<CadastroCorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CadastroCorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CadastroCorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

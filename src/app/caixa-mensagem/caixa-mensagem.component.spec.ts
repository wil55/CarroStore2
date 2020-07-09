import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CaixaMensagemComponent } from './caixa-mensagem.component';

describe('CaixaMensagemComponent', () => {
  let component: CaixaMensagemComponent;
  let fixture: ComponentFixture<CaixaMensagemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CaixaMensagemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CaixaMensagemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

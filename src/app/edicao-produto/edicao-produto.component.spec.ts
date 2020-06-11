import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EdicaoProdutoComponent } from './edicao-produto.component';

describe('EdicaoProdutoComponent', () => {
  let component: EdicaoProdutoComponent;
  let fixture: ComponentFixture<EdicaoProdutoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EdicaoProdutoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EdicaoProdutoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

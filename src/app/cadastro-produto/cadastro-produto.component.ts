import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroupDirective, Validators, FormBuilder } from '@angular/forms';
import { MarcaService } from '../services/marca.service';
import { ProdutoService } from '../services/produto.service';
import { Marca } from '../models/marca.model';
import { Observable } from 'rxjs';
import { Produto } from '../models/produto.model';

@Component({
  selector: 'app-cadastro-produto',
  templateUrl: './cadastro-produto.component.html',
  styleUrls: ['./cadastro-produto.component.scss']
})
export class CadastroProdutoComponent implements OnInit {

  marcas: Observable<Marca[]>;

  formulario = this.formBuilder.group({
    nome: ['', Validators.required],
    potencia: ['', Validators.required],
    idMarca: ['', Validators.required]
  });

  @ViewChild(FormGroupDirective) formGroupDirective: FormGroupDirective;

  constructor(
    private formBuilder: FormBuilder,
    private marcaService: MarcaService,
    private produtoService: ProdutoService
  ) { }
    
  ngOnInit(): void {
    this.marcas = this.marcaService.getObservable();
  }

  async submit() {

    if (!this.formulario.valid) {
      return;
    }

    const novoProduto = this.formulario.value as Produto;
    const produtoSalvo = await this.produtoService.add(novoProduto);

    this.formulario.enable();
    this.formGroupDirective.resetForm();

  }
}

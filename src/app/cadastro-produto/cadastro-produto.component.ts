import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroupDirective, Validators, FormBuilder } from '@angular/forms';
import { MarcaService } from '../services/marca.service';
import { ProdutoService } from '../services/produto.service';
import { Marca } from '../models/marca.model';
import { Observable } from 'rxjs';
import { Produto } from '../models/produto.model';
import { CustomValidators } from '../validators/custom-validators';
import { Categoria } from '../models/categoria.model';
import { CategoriaService } from '../services/categoria.service';
import { Cor } from '../models/cor';
import { CorService } from '../services/cor.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Location } from '@angular/common';


@Component({
  selector: 'app-cadastro-produto',
  templateUrl: './cadastro-produto.component.html',
  styleUrls: ['./cadastro-produto.component.scss']
})
export class CadastroProdutoComponent implements OnInit {

  marcas: Observable<Marca[]>;
  categorias: Observable<Categoria[]>;
  cores: Observable<Cor[]>;

  formulario = this.formBuilder.group({
    nome: ['', Validators.required],
    potencia: ['', [Validators.required, CustomValidators.number]],
    valor: ['', [Validators.required, CustomValidators.number]],
    idMarca: ['', Validators.required],
    idCategoria: ['', Validators.required],
    idCor: ['', Validators.required],
  });

  @ViewChild(FormGroupDirective) formGroupDirective: FormGroupDirective;

  constructor(
    private formBuilder: FormBuilder,
    private marcaService: MarcaService,
    private produtoService: ProdutoService,
    private categoriaService: CategoriaService,
    private corService: CorService,
    private snackBar: MatSnackBar, 
    
    private location: Location
  ) { }
    
  ngOnInit(): void {
    this.marcas = this.marcaService.getObservable();
    this.categorias = this.categoriaService.getObservable();
    this.cores = this.corService.getObservable();
  }

  async submit() {

    if (!this.formulario.valid) {
      return;
    }

    this.formulario.disable();

    const novoProduto = this.formulario.value as Produto;
    novoProduto.dataCadastro = new Date();

    const produto = await this.produtoService.add(novoProduto);

    this.formulario.enable();
    this.formGroupDirective.resetForm();

    this.snackBar.open('Cadastro do Carro Realizado.');

  }

  voltar(){
    this.location.back();
  }
}

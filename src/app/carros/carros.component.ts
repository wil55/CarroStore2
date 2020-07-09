import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Carro } from '../models/carro.model';
import { Categoria } from '../models/categoria.model';
import { Cor } from '../models/cor';
import { Marca } from '../models/marca.model';
import { Produto } from '../models/produto.model';

import { ProdutoService } from '../services/produto.service';
import { PotenciaService } from '../services/potencia.service';
import { MarcaService } from '../services/marca.service';
import { CorService } from '../services/cor.service';
import { CategoriaService } from '../services/categoria.service';
import { CarrosService } from '../services/carros.service';
import { UsuariosService } from '../services/usuarios.service';
import { Usuario } from '../models/usuario.model';


import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
import { Router } from '@angular/router';




@Component({
    selector: 'app-carros',
    templateUrl: './carros.component.html',
    styleUrls: ['./carros.component.scss']
})
export class CarrosComponent implements OnInit {

    carros: Observable<Carro[]>;
    categoris: Observable<Categoria[]>;
    cores: Observable<Cor[]>;
    marcas: Observable<Marca[]>;
    produtos: Observable<Produto[]>;
    usuario: Usuario;

    constructor(
        private CarrosService: CarrosService,
        private router: Router,
        private categoriaService: CategoriaService,
        private corService: CorService,
        private marcaService: MarcaService,
        private produtoService: ProdutoService,
        private usuariosService: UsuariosService
      
    ) { }

    ngOnInit(): void {

    }

    editarCategoria(estilo: Categoria) {
       
    }

}

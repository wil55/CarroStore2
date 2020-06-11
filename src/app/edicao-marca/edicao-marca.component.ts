import { Component, OnInit} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MarcaService } from '../services/marca.service';
import { Marca } from '../models/marca.model';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Location } from '@angular/common';

@Component({
  selector: 'app-edicao-marca',
  templateUrl: './edicao-marca.component.html',
  styleUrls: ['./edicao-marca.component.scss']
})
export class EdicaoMarcaComponent implements OnInit {

  idMarca: string;
  marca: Marca;

  formulario = this.formBuilder.group({
    nome  : ['', Validators.required]
  });

  
  constructor(
    private formBuilder: FormBuilder,
    private marcaService: MarcaService,
    private snackBar: MatSnackBar,
    private location: Location,
    private activedRoute: ActivatedRoute
    ) {

   }
  

  async ngOnInit(){

    this.formulario.disable();
    
    this.idMarca = this.activedRoute.snapshot.paramMap.get('id');
    this.marca = await this.marcaService.get(this.idMarca);

    this.formulario.enable();

  }

  async submit() {

    if(!this.formulario.valid){
      return;
    }

    this.formulario.disable();

    const marcaEditado = this.formulario.value as Marca;
    marcaEditado.dataEdicao = new Date();

    const marca = await this.marcaService.update(this.idMarca, marcaEditado);

    Object.assign(this.marca, marcaEditado);

    this.formulario.enable();

    this.snackBar.open('Marca atualizado com sucesso!');

  }

  voltar(){
    this.location.back();
  }


}

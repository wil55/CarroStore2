import { Component, OnInit } from '@angular/core';
import { Cor } from '../models/cor';
import { Validators, FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CorService } from '../services/cor.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-edicao-cor',
  templateUrl: './edicao-cor.component.html',
  styleUrls: ['./edicao-cor.component.scss']
})
export class EdicaoCorComponent implements OnInit {

  idCor: string;
  cor: Cor;

  formulario = this.formBuilder.group({
    nome  : ['', Validators.required]
  });

  
  constructor(
    private formBuilder: FormBuilder,
    private corService: CorService,
    private snackBar: MatSnackBar,
    private location: Location,
    private activedRoute: ActivatedRoute
    ) {

   }
  

  async ngOnInit(){

    this.formulario.disable();
    
    this.idCor = this.activedRoute.snapshot.paramMap.get('id');
    this.cor = await this.corService.get(this.idCor);

    this.formulario.enable();

  }

  async submit() {

    if(!this.formulario.valid){
      return;
    }

    this.formulario.disable();

    const corEditado = this.formulario.value as Cor;
    corEditado.dataEdicao = new Date();

    const cor = await this.corService.update(this.idCor, corEditado);

    Object.assign(this.cor, corEditado);

    this.formulario.enable();

    this.snackBar.open('Cor atualizado com sucesso!');

  }

  voltar(){
    this.location.back();
  }


}

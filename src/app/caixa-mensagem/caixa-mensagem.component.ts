import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

export class Mensagem {
  titulo: string;
  texto: string;
  acoes: string[];
}

@Component({
  selector: 'app-caixa-mensagem',
  templateUrl: './caixa-mensagem.component.html',
  styleUrls: ['./caixa-mensagem.component.scss']
})
export class CaixaMensagemComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public mensagem: Mensagem) { }

  ngOnInit(): void {
  }

}

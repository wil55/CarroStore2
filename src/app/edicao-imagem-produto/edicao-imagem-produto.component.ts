import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { Imagem } from '../edicao-lista-imagem-produto/edicao-lista-imagem-produto.component';
import { Subscription } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { AngularFireUploadTask, AngularFireStorageReference, AngularFireStorage } from '@angular/fire/storage';

@Component({
  selector: 'app-edicao-imagem-produto',
  templateUrl: './edicao-imagem-produto.component.html',
  styleUrls: ['./edicao-imagem-produto.component.scss']
})
export class EdicaoImagemProdutoComponent implements OnInit, OnDestroy {

  @Input() imagem: Imagem;

  // @Input() url: string;
  // @Input() arquivo: File;

  @Input() idProduto: string;

  @Output() fileUploded: EventEmitter<Imagem> = new EventEmitter();

  enviando: boolean;
  carregando: boolean;
  progressoEnvio: number;

  private fileReference: AngularFireStorageReference;
  private uploadTask: AngularFireUploadTask;

  private percentageChangesSubscription: Subscription;
  private snapshotChangesSubscription: Subscription;

  constructor(private fireStorage: AngularFireStorage) { }

  ngOnInit(): void {

    if (this.imagem.url) {

      this.carregando = true;

    } else {

      if (!this.imagem.arquivo) {
        return;
      }

      this.enviando = true;

      const nome = `${this.idProduto}_${new Date().getTime()}_${this.imagem.arquivo.name}`;

      this.fileReference = this.fireStorage.ref(nome);
      this.uploadTask = this.fireStorage.upload(nome, this.imagem.arquivo);
      

      this.percentageChangesSubscription = this.uploadTask.percentageChanges()
        .subscribe(x => {
          console.log(x);
          this.progressoEnvio = x;
        });

      this.snapshotChangesSubscription = this.uploadTask.snapshotChanges()
        .pipe(finalize(() => this.uploadFinalizado()))
        .subscribe();

    }

  }

  ngOnDestroy(): void {

    this.uploadTask.cancel();

    if (this.percentageChangesSubscription){
      this.percentageChangesSubscription.unsubscribe();
    }

    if (this.snapshotChangesSubscription) {
      this.percentageChangesSubscription.unsubscribe();
    }

  }

  private async uploadFinalizado(){

    this.enviando = false;
    this.carregando = true;

    const url = await this.fileReference.getDownloadURL().toPromise();

    this.imagem.url = url;

    this.fileUploded.emit(this.imagem);

  }

  imagemCarregada(){
    this.carregando = false;
  }

}

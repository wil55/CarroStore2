import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';

// Angular locale
import localept from '@angular/common/locales/pt';
import { registerLocaleData } from '@angular/common';
registerLocaleData(localept, 'pt');

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Firebase
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';

// Reactive forms
import { FormsModule, ReactiveFormsModule, FormBuilder } from '@angular/forms';

// Flex Layout
import { FlexLayoutModule } from '@angular/flex-layout';

// Angular Material
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule, MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material/snack-bar';

import { environment } from 'src/environments/environment';
import { EdicaoMarcaComponent } from './edicao-marca/edicao-marca.component';
import { CadastroMarcaComponent } from './cadastro-marca/cadastro-marca.component';
import { CadastroProdutoComponent } from './cadastro-produto/cadastro-produto.component';
import { EdicaoListaImagemProdutoComponent } from './edicao-lista-imagem-produto/edicao-lista-imagem-produto.component';
import { EdicaoImagemProdutoComponent } from './edicao-imagem-produto/edicao-imagem-produto.component';
import { EdicaoProdutoComponent } from './edicao-produto/edicao-produto.component';
import { CadastroCategoriaComponent } from './cadastro-categoria/cadastro-categoria.component';
import { CadastroCorComponent } from './cadastro-cor/cadastro-cor.component';
import { EdicaoCategoriaComponent } from './edicao-categoria/edicao-categoria.component';
import { EdicaoCorComponent } from './edicao-cor/edicao-cor.component';


@NgModule({
  declarations: [
    AppComponent,
    EdicaoMarcaComponent,
    CadastroMarcaComponent,
    CadastroProdutoComponent,
    EdicaoListaImagemProdutoComponent,
    EdicaoImagemProdutoComponent,
    EdicaoProdutoComponent,
    CadastroCategoriaComponent,
    CadastroCorComponent,
    EdicaoCategoriaComponent,
    EdicaoCorComponent,
    
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,

    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,

    FormsModule,
    ReactiveFormsModule,

    FlexLayoutModule,
    
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    MatSnackBarModule

  ],
  providers: [
    { provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: { duration: 2500 } },
    { provide: LOCALE_ID, useValue: 'pt' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

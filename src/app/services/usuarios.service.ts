import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { Usuario } from '../models/usuario.model';

@Injectable({
    providedIn: 'root'
})
export class UsuariosService {

    constructor(private firestore: AngularFirestore, private auth: AngularFireAuth) { }

    private convertToUsuario(document: firebase.firestore.DocumentSnapshot<firebase.firestore.DocumentData>): Usuario {

        const dados = document.data();

        const usuario = {
            id: document.id,
            ...dados
        } as Usuario;

        return usuario;

    }

    async add(uid: string, usuario: Usuario): Promise<Usuario> {

        await this.firestore.collection<Usuario>('usuarios').doc(uid).set(usuario);

        return this.get(uid);

    }

    async get(id: string): Promise<Usuario> {

        const document = await this.firestore.collection<Usuario>('usuarios').doc(id).get().toPromise();

        return this.convertToUsuario(document);

    }
    
    async getUsuarioLogado(): Promise<Usuario> {

        return new Promise<Usuario>(resolve => {

            this.auth.user.subscribe(user => {



                if (user) {
                    const id = user.uid;
                    resolve(this.get(id));
                } else {
                    resolve(null);
                }

            });

        });

    }

}

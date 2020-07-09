import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Carro } from '../models/carro.model';

@Injectable({
    providedIn: 'root'
})
export class CarrosService {

    constructor(private firestore: AngularFirestore) { }

    getObservable(): Observable<Carro[]> {
        return this.firestore.collection<Carro>('carros').valueChanges({ idField: 'id' });
    }

    private convertToArte(document: firebase.firestore.DocumentSnapshot<firebase.firestore.DocumentData>): Carro {

        const dados = document.data();

        const carro = {
            id: document.id,
            ...dados
        } as Carro;

        if (dados.dataEdicao) {
            carro.dataEdicao = dados.dataEdicao.toDate();
        }

        if (dados.dataCadastro) {
            carro.dataCadastro = dados.dataCadastro.toDate();
        }

        return carro;

    }

    async add(estilo: Carro): Promise<Carro> {

        const documentRef = await this.firestore.collection<Carro>('carro').add(estilo);
        const document = await documentRef.get();

        return this.convertToArte(document);

    }

    async get(id: string): Promise<Carro> {

        const document = await this.firestore.collection<Carro>('carros').doc(id).get().toPromise();

        return this.convertToArte(document);

    }

    async update(id: string, carro: Carro): Promise<void> {

        await this.firestore.collection<Carro>('carros').doc(id).update(carro);

    }

}

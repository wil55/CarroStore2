export class Produto {

    id: string;
    nome: string;
    potencia: number;
    valor: number;
    dataCadastro: Date;
    dataEdicao: Date;
    
    imagens: string[];

    idMarca: string; // Yamaha, Honda, Kawasaki
    idCategoria: string; // Naked, Esportiva, Big Trail
    idCores: string; // Azul e prata, vermelho, preto

}
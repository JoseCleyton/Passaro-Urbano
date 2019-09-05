import { HttpClient, HttpResponse } from '@angular/common/http'
import { Oferta } from '../shared/oferta.model'
import { Injectable } from '@angular/core';
import { URL_API , URL_API_COMO_USAR, URL_API_ONDE_FICA } from '../app.api'
import { Observable } from 'rxjs';
import { map , retry} from 'rxjs/operators'


@Injectable()
export class OfertasService{
    
    private ofertas : Oferta[]
    
    constructor(private http : HttpClient){}

    public getOfertas (): Promise<Oferta[]>{
         return this.http.get<Oferta[]>(`${URL_API}`)
         .toPromise()
         .then((resposta: any)=> this.ofertas= resposta)
    }

    public getOfertasPorCategoria(categoria: string): Promise<Oferta[]>{
        return this.http.get <Oferta[]> (`${URL_API}?categoria=${categoria}`)
        .toPromise()
        .then((resposta: any)=> this.ofertas= resposta)
    }
    public getOfertaPorId(id : number): Promise<Oferta>{
        
        return this.http.get<Oferta>(`${URL_API}?id=${id}`)
        .toPromise()
        .then(( resposta : Oferta ) => resposta[0])
    }
    public getComoUsarOfertaPorId(id : number): Promise<string>{
        return this.http.get(`${URL_API_COMO_USAR}?id=${id}`)
        .toPromise()
        .then(( resposta : string ) => resposta[0] )
    }
    public getOndeFicaOfertaPorId(id : number): Promise<string>{
        return this.http.get(`${URL_API_ONDE_FICA}?id=${id}`)
        .toPromise()
        .then(( resposta : string ) => resposta[0] )
    }

    public pesquisaOferta(termoDaBusca: string): Observable<Oferta[]>{
        return this.http.get(`${URL_API}?descricao_oferta_like=${termoDaBusca}`) 
        .pipe( retry(10) , // função para determinar a quantidade de tentativas
            map(( resposta : any) => resposta )
        )
    }
    

    /*
    public ofertas : Array <Oferta> =
        [
            {
                id: 1,
                categoria: "restaurante",
                titulo: "xxx",
                descricao_oferta: "Rodízio de Mini-hambúrger com opção de entrada.",
                anunciante: "Original Burger",
                valor: 29.90,
                destaque: true,
                imagens: [
                    {url: "/assets/ofertas/1/img1.jpg"},
                    {url: "/assets/ofertas/1/img2.jpg"},
                    {url: "/assets/ofertas/1/img3.jpg"},
                    {url: "/assets/ofertas/1/img4.jpg"}
                ]
            },
            {
                id: 2,
                categoria: "restaurante",
                titulo: "Cozinha Mexicana",
                descricao_oferta: "Almoço ou Jantar com Rodízio Mexicano delicioso.",
                anunciante: "Mexicana",
                valor: 32.90,
                destaque: true,
                imagens: [
                    {url: "/assets/ofertas/2/img1.jpg"},
                    {url: "/assets/ofertas/2/img2.jpg"},
                    {url: "/assets/ofertas/2/img3.jpg"},
                    {url: "/assets/ofertas/2/img4.jpg"}
                ]
            
            },
            {
                id: 4,
                categoria: "diversao",
                titulo: "Estância das águas",
                descricao_oferta: "Diversão garantida com piscinas, trilhas e muito mais.",
                anunciante: "Estância das águas",
                valor: 31.90,
                destaque: true,
                imagens: [
                    {url: "/assets/ofertas/3/img1.jpg"},
                    {url: "/assets/ofertas/3/img2.jpg"},
                    {url: "/assets/ofertas/3/img3.jpg"},
                    {url: "/assets/ofertas/3/img4.jpg"},
                    {url: "/assets/ofertas/3/img5.jpg"},
                    {url: "/assets/ofertas/3/img6.jpg"}
                ]
            }
        ]
    public getOfertas(): Array<Oferta>{
        
        return this.ofertas
    }

    public getOfertas2(): Promise<Oferta[]>{
        return new Promise((resolve, reject)=>{
            // algum tipo de processamento, que ao finalizar, chama a função resolve ou reject
            let deuCerto= true
            if(deuCerto){
                setTimeout(()=> resolve(this.ofertas), 3000)                
            }else{
                reject({
                    codigo: 404,
                    mensagem: "NOT FOUND"
                })
            }
        })
        .then((ofertas : Oferta[]) => {
            // fazer alguma tratativa
            console.log("Primeiro then")
            return ofertas
        })
        .then((ofertas : Oferta[]) => {
            // fazer outra tratativa
            console.log("Segundo then")
            return new Promise((resolve2, reject2 ) => {
                setTimeout( ()=> { resolve2 (ofertas ) }, 3000)
            })
            .then (( ofertas : Oferta[]) => { 
                console.log("Terceiro then executado após 3 segundo porque estava aguardando uma promisse ser resolvida")
                return ofertas
            })
        })
    }*/
}
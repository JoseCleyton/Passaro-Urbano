import { Pedido } from '../shared/pedido.model'
import { HttpClient} from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs';
import { URL_API_PEDIDOS } from '../app.api'
import { map } from 'rxjs/operators';

@Injectable()
export class OrdemCompraService{

    constructor(private http : HttpClient){}

    public efetivarCompra(pedido : Pedido) : Observable<Pedido>{

        return this.http.post<Pedido>(`${URL_API_PEDIDOS}`, pedido)
        .pipe(
            map(( resposta : Pedido) => resposta )                
         )
    }
}
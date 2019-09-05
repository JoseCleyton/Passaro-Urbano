import { Component, OnInit } from '@angular/core';
import { OfertasService } from '../services/ofertas.service'
import { Oferta } from '../shared/oferta.model'


@Component({
  selector: 'app-restaurantes',
  templateUrl: './restaurantes.component.html',
  styleUrls: ['./restaurantes.component.css'],
  providers: [ OfertasService ]
})
export class RestaurantesComponent implements OnInit {
  public ofertasRestaurantes : Oferta []

  public dataTeste : any = new Date(2017,8 ,30)

  constructor(private ofertasService : OfertasService) { }

  ngOnInit() {
    this.ofertasService.getOfertasPorCategoria('restaurante')

    .then((oferta : Oferta[])=>{ this.ofertasRestaurantes = oferta }).catch((erro: any)=>{ console.log(erro) })
  }

}

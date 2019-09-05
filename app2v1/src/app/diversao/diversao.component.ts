import { Component, OnInit } from '@angular/core';
import { OfertasService } from '../services/ofertas.service'
import { Oferta } from '../shared/oferta.model'

@Component({
  selector: 'app-diversao',
  templateUrl: './diversao.component.html',
  styleUrls: ['./diversao.component.css'],
  providers: [ OfertasService ]
})
export class DiversaoComponent implements OnInit {
public ofertasDiversao: Oferta []
  constructor(private ofertasService: OfertasService) { }

  ngOnInit() {
    this.ofertasService.getOfertasPorCategoria('diversao')
    .then(( oferta: Oferta [] ) => { this.ofertasDiversao= oferta })
    .catch(( erro : any ) => { console.log( erro ) })
  }

}

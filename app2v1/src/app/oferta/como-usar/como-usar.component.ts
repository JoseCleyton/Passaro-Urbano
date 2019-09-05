import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'
import { OfertasService } from '../../services/ofertas.service'

@Component({
  selector: 'app-como-usar',
  templateUrl: './como-usar.component.html',
  styleUrls: ['./como-usar.component.css'],
  providers : [OfertasService]
})
export class ComoUsarComponent implements OnInit {

  public comoUsar : any

  constructor(private route : ActivatedRoute , private ofertasService : OfertasService) { }

  ngOnInit() {

    this.route.parent.params.subscribe(( paramento : any)=>{
      this.ofertasService.getComoUsarOfertaPorId(paramento.id)
      .then( (resposta : string ) => this.comoUsar = resposta )
      .catch (( erro : any ) => console.log( erro ))
    })
  }

}

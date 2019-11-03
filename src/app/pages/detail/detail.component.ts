import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {

  productArray: any;

  constructor(
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.cargarDetalleProducto();
  }

  cargarDetalleProducto() {
    this.route.queryParams.subscribe((queryParams: any) => {
      this.productArray = JSON.parse(queryParams.data);
    });
  }

}

import { Component, OnInit, OnDestroy } from '@angular/core';
import { NotifyService } from 'src/app/services/notify.service';
import { StorageUtil } from 'src/app/util/storage';
import { RipleyService } from 'src/app/services/ripley.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  private subscription: Subscription;

  listProductsApi: any = [];
  listProductsSKU = [
    '2000374166522p',
    '2000376649535p',
    '2000376584805p',
    '406271',
    '2000375722154P',
    '2000372444561p',
    '2000374782241p',
    '2000376584812p',
    '2000375722161p',
  ];

  totalProdutos = 9;
  showLoader: boolean;

  token = '';

  constructor(
    private ripleyService: RipleyService,
    private notify: NotifyService,
    private storage: StorageUtil,
    private router: Router) {

    const tok = JSON.parse(this.storage.obtenerToken());
    if (tok !== null) {
      this.token = tok;
    }
    this.lisarProductos();
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    if (this.subscription !== undefined) {
      this.subscription.unsubscribe();
    }
  }

  lisarProductos() {
    this.listProductsApi = [];
    this.listProductsSKU.forEach((element) => {
      // leer token NotifyService, storage
      this.showLoader = true;
      this.ripleyService.getDataProductId(element, this.token).subscribe((response: any) => {
        if (!response.ok) {
          this.notify.session$.emit(false);
        }
        if (response.token !== '') {
          this.actualizarTokenLocal(response.token);
        }
        if (response.producto !== undefined) {
          this.listProductsApi.push(response.producto);
        }
      }, (error) => {
        console.error(error);
      });
      this.showLoader = false;
    });
  }

  actualizarTokenLocal(tokenRefresh) {
    this.storage.guardarToken(tokenRefresh);
  }

  detailPage(producto) {
    this.router.navigate(['/detail'], { queryParams: { data: JSON.stringify(producto) } });
  }

}

import {Component, ViewChild} from '@angular/core';
import {PaymentsDataService} from "../../shared/services/payments/payments-data.service";
import {ProductsDataService} from "../../shared/services/products/products-data.service";
import decode from "jwt-decode";
import {formatNumber} from "@angular/common";
import {Router} from "@angular/router";
import {OrdersDataService} from "../../shared/services/orders/orders-data.service";
import {FormBuilder, Validators} from "@angular/forms";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {
  produtosArray: any[] = [];
  produtos: any[] = [];
  produtosQuantidades: { [key: string]: number } = {};
  @ViewChild('staticModal') staticModal: any; // Reference to the modal element

  pedidoForm = this.formBuilder.group({
    Descricao: '',
    Morada: '',
    HoraReservada: ''
  });

  constructor(
    private productsDataService: ProductsDataService,
    private ordersDataService: OrdersDataService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit() {
    this.productsDataService.getProducts().subscribe((data: Object) => {
      this.produtos = data as any[];
    });
  }

  adicionarProduto(prodNome: string): void {
    if (prodNome in this.produtosQuantidades) {
      this.produtosQuantidades[prodNome]++;
    } else {
      this.produtosQuantidades[prodNome] = 1;
    }

    this.produtosArray = [];
    for (const [prodId, quantidade] of Object.entries(this.produtosQuantidades)) {
      this.produtosArray.push({ Nome: prodId, Quantidade: quantidade });
    }
  }

  openModal() {
    this.staticModal.nativeElement.classList.remove('hidden');
    this.staticModal.nativeElement.classList.add('flex');

    this.pedidoForm.patchValue({
      Descricao: this.produtosArray.map(prod => `${prod.Nome}: ${prod.Quantidade}`).join('; ')
    });
  }

  closeModal() {
    this.staticModal.nativeElement.classList.remove('flex');
    this.staticModal.nativeElement.classList.add('hidden');
  }

  concluirPedido() {
    const token = localStorage.getItem('token');
    const tokenPayload = decode(token as string) as any;

    this.ordersDataService.addOrder(this.pedidoForm, this.produtosArray, tokenPayload.user[0].Id).subscribe((data: Object) => {
      this.router.navigate(['/payments']);
    });

  }
}

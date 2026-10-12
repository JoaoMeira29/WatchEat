import {Component, ViewChild} from '@angular/core';
import {PagamentosDataService} from "../../_shared/services/Pagamentos/pagamentos-data.service";
import {ProdutosDataService} from "../../_shared/services/Produtos/produtos-data.service";
import decode from "jwt-decode";
import {formatNumber} from "@angular/common";
import {Router} from "@angular/router";
import {PedidosDataService} from "../../_shared/services/Pedidos/pedidos-data.service";
import {FormBuilder, Validators} from "@angular/forms";

@Component({
  selector: 'app-pagina-produtos',
  templateUrl: './pag-produtos.component.html',
  styleUrls: ['./pag-produtos.component.css']
})
export class PagProdutosComponent {
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
    private produtosDataService: ProdutosDataService,
    private pedidosDataService: PedidosDataService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit() {
    this.produtosDataService.getProdutos().subscribe((data: Object) => {
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

    this.pedidosDataService.addPedido(this.pedidoForm, this.produtosArray, tokenPayload.user[0].Id).subscribe((data: Object) => {
      this.router.navigate(['/pagamentos']);
    });

  }
}

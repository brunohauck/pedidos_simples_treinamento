import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { Http } from '@angular/http'
import { LoginPage } from '../login/login';
import { Cardapio } from '../../domain/cardapio/cardapio'
import { Pedido } from '../../domain/pedido/pedido'
import { Usuario} from '../../domain/usuario/usuario'
 
/**
 * Generated class for the FazerpedidoPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */


@Component({
  selector: 'page-fazerpedido',
  templateUrl: 'fazerpedido.html',
})
export class FazerpedidoPage {

  public cardapio: Cardapio;
  public data;
  public http;
  public url: string;
  public pedido: Pedido;
  
  constructor(
    public navCtrl: NavController,
    public _alertCtrl: AlertController,
    http: Http, 
    public navParams: NavParams) {
    //this.cardapio = this.navParams.get('cardapioSelecionado');
    this.pedido = new Pedido(null,null,null,null,null,null,null,null);
    this.pedido.cardapio = this.navParams.get('cardapioSelecionado');
    this.http = http;
    this.data = {};
    this.data.response = '';
    this.url = "http://marmita.idsgeo.com/index.php/page/cadastrar_pedido_ionic";
  }
  ngOnInit(){
    console.log(sessionStorage.getItem('usuarioId'));
    console.log(sessionStorage.getItem('usuarioLogado'));
    //this.pedido.usuario = new Usuario(sessionStorage.getItem('usuarioId'),"Bruno Hauck",sessionStorage.getItem('usuarioLogado'),null,null)
    if(sessionStorage.getItem('flagLogado')!="sim"){
      this.goToLogin();
    }
  }
  goToLogin(){
    this.navCtrl.setRoot(LoginPage);
  }
  submit(){
    var data = JSON.stringify({
      cardapioId: this.pedido.cardapio.id,
      usuarioId: this.pedido.id,
      valor: this.pedido.cardapio.preco,
      taxaEntrega: "10.00",
      nome: "brunohauck",
      email: sessionStorage.getItem('usuarioLogado'),
      observacao: this.pedido.observacao
    });
    
    this.http.post(this.url, data)
      .subscribe(data => {
          this.data.response = data._body;
          this._alertCtrl
          .create({
            title: 'Sucesso',
            buttons: [{ text: 'OK' }],
            subTitle: this.data.response
          }).present();  

      }, error => {
          console.log("Oooops!");
          this._alertCtrl
          .create({
            title: 'Falha na conexão',
            buttons: [{ text: 'Estou ciente!' }],
            subTitle: 'Não foi possível obter a lista de restaurantes. Tente novamente.'
          }).present();
      });
    
    console.log(data);
  }

 

}

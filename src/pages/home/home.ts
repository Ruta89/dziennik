import { Component } from '@angular/core';
import { NavController, ModalController, Platform } from 'ionic-angular';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  // items: FirebaseListObservable<any[]>;
  items;

  constructor(public navCtrl: NavController,
    public afDB: AngularFireDatabase,
    private modalCtrl: ModalController,
    private platform: Platform) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad');
    // this.platform.ready().then(() => {
    //   this.items = this.afDB.list('/dziennik');
    // });
    this.items = this.afDB.list('/dziennik');
  }

  addItem() {
    let modal = this.modalCtrl.create('ModalPage');
    modal.present();
  }

  editItem(item) {
    let params = { item: item, isEditabled: true },
      modal = this.modalCtrl.create('ModalPage', params);
    modal.present();
  }

  deleteItem(item) {
    this.items.remove(item);
  }





}

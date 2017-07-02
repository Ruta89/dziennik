import { FirebaseListObservable, AngularFireDatabase } from 'angularfire2/database';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { FormBuilder, Validators } from "@angular/forms";


@IonicPage()
@Component({
  selector: 'page-modal',
  templateUrl: 'modal.html',
})
export class ModalPage {
  public form: any;
  public items: FirebaseListObservable<any[]>;
  public itemTitle: any = '';
  public itemSummary: any = '';
  public itemId: string = '';
  public isEditabled: boolean = false;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private fb: FormBuilder,
    private afDb: AngularFireDatabase,
    private viewCtrl: ViewController) {

    this.form = fb.group({
      'title': ['', Validators.minLength(2)],
      'summary': ['', Validators.minLength(5)]
    });

    this.items = this.afDb.list('/items');

    if (navParams.get('isEditabled')) {
      let item = navParams.get('item'),
        k;

      this.itemTitle = item.title;
      this.itemSummary = item.summary;
      this.itemId = item.$key;

      this.isEditabled = true;
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ModalPage');
  }

  saveItem(val) {
    let title: string = this.form.controls["title"].value,
      summary: string = this.form.controls["summary"].value,
      k: any;

    if (this.isEditabled) {
      this.items.update(this.itemId, {
        title: title,
        summary: summary
      });
    } else {
      this.items.push({
        title: title,
        summary: summary
      });
    }

    this.closeModal();
  }

  closeModal() {
    this.viewCtrl.dismiss();
  }


}

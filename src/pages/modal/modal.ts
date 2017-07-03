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
  public itemDate: any;
  public itemRating: any = '';
  public itemTodo: any = [];
  public itemDone: any = [];

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private fb: FormBuilder,
    private afDb: AngularFireDatabase,
    private viewCtrl: ViewController) {

    this.form = fb.group({
      'title': ['', Validators.minLength(2)],
      'summary': ['', Validators.required],
      'rating': ['', Validators.required],
       'todo': [''],
        'done': ['']
    });

    this.items = this.afDb.list('/items');

    if (navParams.get('isEditabled')) {
      let item = navParams.get('item'),
        k;

      this.itemTitle = item.title;
      this.itemSummary = item.summary;
      this.itemDate = item.date;
      this.itemRating = item.rating;
      this.itemId = item.$key;

      for (k in item.todo){
        this.itemTodo.push(item.todo[k].name);
      }

      for (k in item.done){
        this.itemDone.push(item.done[k].name);
      }

      this.isEditabled = true;
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ModalPage');
  }

  saveItem(val) {
    let title: string = this.form.controls["title"].value,
      summary: string = this.form.controls["summary"].value,
      rating: string = this.form.controls["rating"].value,
      todo: any = this.form.controls["todo"].value,
      done: any = this.form.controls["done"].value,
      todoArray: any = [],
      doneArray: any = [],
      date: any = Date.now(),
      k: any;

      for (k in todo){
        todoArray.push({
          "name": todo[k]
        });
      }

      for (k in done){
        doneArray.push({
          "name": done[k]
        });
      }

    if (this.isEditabled) {
      this.items.update(this.itemId, {
        title: title,
        summary: summary,
        upDate: date,        
        rating: rating,
        todo: todoArray,
        done: doneArray
      });
      console.log(' if (this.isEditabled) update( ');
    } else {
      this.items.push({
        title: title,
        date: date,
        summary: summary,
        rating: rating,
        todo: todoArray,
        done: doneArray
      });
        console.log(' else push( ');
    }

    this.closeModal();
  }

  closeModal() {
    this.viewCtrl.dismiss();
  }


}

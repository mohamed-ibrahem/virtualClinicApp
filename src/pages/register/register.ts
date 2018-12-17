import {Component, ElementRef, ViewChild} from '@angular/core';
import {IonicPage, NavController, Slides} from 'ionic-angular';
import {FormArray, FormBuilder, Validators} from "@angular/forms";

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
  @ViewChild(Slides) slides: Slides;
  @ViewChild('formTabs') ul: ElementRef;
  form;

  constructor(public navCtrl: NavController, public fb: FormBuilder) {
    this.form = this.fb.group({
      register: this.fb.array([
        this.fb.group({
          email: ['', Validators.compose([Validators.required, Validators.email])],
          phone: ['', Validators.required],
          password: ['', Validators.required]
        }),
        this.fb.group({
          email: ['', Validators.compose([Validators.required, Validators.email])],
          phone: ['', Validators.required],
          password: ['', Validators.required]
        }),
        this.fb.group({
          email: ['', Validators.compose([Validators.required, Validators.email])],
          phone: ['', Validators.required],
          password: ['', Validators.required]
        })
      ])
    })
  }

  ionViewDidLoad() {
    this.slides.lockSwipeToNext(true);
    this.slides.stopAutoplay();
  }

  gotToNext() {
    var registerArray = <FormArray> this.form.controls['register'];
    if (!registerArray.invalid) {
      this.slides.lockSwipeToNext(false);

      this.slides.slideNext();
      this.slides.lockSwipeToNext(true);
    }
  }

  goToBack() {
    this.slides.slidePrev();
  }

  register() {

  }

  slideChanged() {
    let currentIndex = this.slides.getActiveIndex();

    Array.from(this.ul.nativeElement.children).map((item: any, index) => {
      item.classList.remove('active', 'done');

      if (index < currentIndex)
        item.classList.add('done');
      else if (index === currentIndex)
        item.classList.add('active');
    });
  }

  get isFirst() {
    return this.slides.isBeginning();
  }

  get isEnd() {
    return this.slides.isEnd();
  }
}

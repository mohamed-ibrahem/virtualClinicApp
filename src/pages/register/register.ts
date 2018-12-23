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
          name: ['', Validators.required],
          gender: ['', Validators.required],
          age: ['', Validators.compose([Validators.required, Validators.min(16)])],
          country: ['', Validators.required]
        }),
        this.fb.group({
          email: ['', Validators.compose([Validators.required, Validators.email])],
          phone: ['', Validators.compose([Validators.required, Validators.minLength(12)])],
          password: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
          password_confirmation: ['', Validators.compose([Validators.required, Validators.minLength(6)])]
        }),
        this.fb.group({
          description: ['', Validators.required]
        })
      ])
    })
  }

  ionViewDidLoad() {
    this.slides.lockSwipeToNext(true);
    this.slides.stopAutoplay();
  }

  gotToNext() {
    if (this.formArray.at(this.slides.getActiveIndex()).valid) {
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

  get formArray() {
    return <FormArray> this.form.controls['register'];
  }

  get invalid() {
    let form = this.formArray.at(this.slides.getActiveIndex())

    return form ? form.invalid : true;
  }
}

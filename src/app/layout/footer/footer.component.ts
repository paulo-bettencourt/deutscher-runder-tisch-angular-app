import {Component, signal} from '@angular/core';
import {ClassSignal} from "../../pages/classroom/list/classroom.component";

@Component({
  selector: 'footer',
  standalone: true,
  templateUrl: './footer.component.html'
})
export class FooterComponent {

  quotes = [  { quote: "Making mistakes is normal and important for learning a language." },  { quote: "Every day is an opportunity to learn something new." },  { quote: "Learning languages opens doors to new cultures and experiences." },  { quote: "Learning a new language is like discovering a new world." },  { quote: "Language learning is an adventure that accompanies you for a lifetime." },  { quote: "Only those who know their goal will find the way. Set a clear goal when learning a language." },  { quote: "Learning a language broadens your horizons and promotes your thinking ability." },  { quote: "Practice makes perfect - and that also applies to learning a language." },  { quote: "Start small and work your way up step by step. Every progress counts!" },  { quote: "Language learning can be difficult, but it is one of the most rewarding challenges out there." }];
  classSignals = signal<ClassSignal[]>([]);

  constructor() {
    this.changeSignalTitle()
  }

  changeSignalTitle() {
    let randomIndex = Math.floor(Math.random() * this.quotes.length);
    this.classSignals.set([{title: this.quotes[randomIndex].quote}])
  }
}

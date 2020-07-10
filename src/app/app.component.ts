import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  foo(): string {
    return ''
  }

  bar() {
    const bar = this.foo()
  }
}

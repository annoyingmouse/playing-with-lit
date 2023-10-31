import {LitElement, html, css} from 'https://jspm.dev/lit'
export default class MyCounter extends LitElement {
  static styles = [
    css`
      button {
        background-color: #4CAF50;
        border: none;
        color: white;
      }`
  ] // css`
  static properties = {
    count: {
      type: Number,
      reflect: true,
    },
  }
  constructor(props) {
    super(props);
    this.count = 0;
  }
  decrement() {
    this.count--;
  }
  increment() {
    this.count++;
  }
  render() {
    return html`
      <button @click=${this.decrement}>
        Decrement
      </button>
      <span>
        ${this.count}
      </span>
      <button @click=${this.increment}>
        Increment
      </button>
    `
  }

}

customElements.define('my-counter', MyCounter)
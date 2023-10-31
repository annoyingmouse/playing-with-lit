import {LitElement, html, css} from 'https://jspm.dev/lit'

export class MyElement extends LitElement {
  static properties = {
    name: {},
    checked: {},
    _listItems: {state: true},
    hideCompleted: {},
  }
  static styles = css`
    .completed {
      text-decoration-line: line-through;
      color: #777;
    }
  `
  constructor() {
    super();
    this.name = 'Dom';
    this._listItems = [
      {
        text: 'Start Lit tutorial',
        completed: true
      }, {
        text: 'Make to-do list',
        completed: false
      }
    ]
    this.hideCompleted = false;
  }
  changeName(event) {
    const input = event.target
    this.name = input.value
  }
  setChecked(event) {
    this.checked = event.target.checked
  }
  addToDo() {
    this._listItems = [...this._listItems,
      {text: this.input.value, completed: false}];
    this.input.value = '';
  }
  get input() {
    return this.renderRoot?.querySelector('#newitem') ?? null;
  }
  toggleCompleted(item) {
    item.completed = !item.completed;
    this.requestUpdate();
  }
  setHideCompleted(e) {
    this.hideCompleted = e.target.checked;
  }
  render() {
    const caughtUpMessage = html`
      <p>
      You're all caught up!
      </p>
    `;
    const items = this.hideCompleted
      ? this._listItems.filter((item) => !item.completed)
      : this._listItems;
    console.log(items);
    const todos = html`
      <ul>
        ${items.map(
          (item) => html`
            <li
                class=${item.completed ? 'completed' : ''}
                @click=${() => this.toggleCompleted(item)}>
              ${item.text}
            </li>`
        )}
      </ul>
    `;
    const todosOrMessage = items.length > 0
      ? todos
      : caughtUpMessage;
    return html`
      <p>Hello, ${this.name}!</p>
      <input @input=${this.changeName}
             ?disabled=${!this.checked}
             placeholder="Enter your name">
      <label><input type="checkbox" @change=${this.setChecked}> Enable editing</label>
      ${todosOrMessage}
      <input id="newitem" aria-label="New item">
      <button @click=${this.addToDo}>Add</button>
      <br>
      <label>
        <input type="checkbox"
               @change=${this.setHideCompleted}
               ?checked=${this.hideCompleted}>
        Hide completed
      </label>

    `
  }
}
customElements.define('my-element', MyElement)
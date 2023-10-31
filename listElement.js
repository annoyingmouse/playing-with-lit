import {LitElement, html, css} from 'https://jspm.dev/lit'
import {map} from 'https://jspm.dev/lit/directives/map.js'
import {range} from 'https://jspm.dev/lit/directives/range.js'
import {repeat} from 'https://jspm.dev/lit/directives/repeat.js'

class ListElement extends LitElement {
  static properties = {
    items: {state: true},
    friends: {state: true},
    pets: {state: true},
    includePets: {state: true},
    things: {state: true},
  };

  constructor() {
    super();
    this.items = new Set(['Apple', 'Banana', 'Grape', 'Orange', 'Lime']);
    this.names = ['Chandler', 'Phoebe', 'Joey', 'Monica', 'Rachel', 'Ross'];
    this.friends = ['Harry', 'Ron', 'Hermione'];
    this.pets = [
      {name: 'Hedwig', species: 'Owl'},
      {name: 'Scabbers', species: 'Rat'},
      {name: 'Crookshanks', species: 'Cat'},
    ];
    this.includePets = true;
    this.tasks = [
      {id: 'a', label: 'Learn Lit'},
      {id: 'b', label: 'Feed the cat'},
      {id: 'c', label: 'Go for a walk'},
      {id: 'd', label: 'Take a nap'},
    ];
    this.things = [
      'Raindrops on roses',
      'Whiskers on kittens',
      'Bright copper kettles',
      'Warm woolen mittens',
    ];
  }
  static styles = css`
    /* playground-fold */
    :host {
      display: block;
      width: 400px;
      height: 400px;
    }
    #board {
      display: grid;
      grid-template-columns: repeat(8, 1fr);
      grid-template-rows: repeat(8, 1fr);
      border: 2px solid #404040;
      box-sizing: border-box;
      height: 100%;
    }
    #board > div {
      padding: 2px;
    }
    .black {
      color: #ddd;
      background: black;
    }
    .white {
      color: gray;
      background: white;
    }
    /* playground-fold-end */

  `;
  render() {
    const listItems = [];
    this.friends.forEach((friend) => {
      listItems.push(html`<li>${friend}</li>`);
    });
    if (this.includePets) {
      this.pets.forEach((pet) => {
        listItems.push(html`<li>${pet.name} (${pet.species})</li>`);
      });
    }
    return html`
      <h1>Rendering lists with Lit</h1>
      <p>Lit has built-in support for any iterables!</p>
      <h2>Array</h2>
      <p>
        ${['✨', '🔥', '❤️']}
      </p>
      <h2>Set</h2>
      <p>
        ${new Set(['A', 'B', 'C'])}
      </p>
      <h2>Generator</h2>
      <p>
        ${(function* () {
      for (let i = 1; i < 4; i++) yield i;
    })()}
      </p>
      <p>My unique fruits</p>
      <ul>
        ${map(this.items, (item, index) => html`<li>${index + 1} ${item}</li>`)}
      </ul>
      <p>Names with 'e' in them</p>
      <ul>
        ${this.names
          .filter((name) => name.match(/e/i))
          .map((name) => html`<li>${name}</li>`)}
      </ul>
      <button @click=${() => this._togglePetVisibility()}>
        ${this.includePets ? 'Hide' : 'Show'} pets
      </button>
      <p>My magical friends</p>
      <ul>
        ${listItems}
      </ul>
      <p>Let's play a game!</p>
      <div id="board">
        ${map(range(8), (row) => map(range(8), (col) => html`
          <div class="${getColor(row, col)}">${getLabel(row, col)}</div>
        `))}
      </div>
      <button @click=${() => this._sort(1)}>Sort ascending</button>
      <button @click=${() => this._sort(-1)}>Sort descending</button>
      <h2>Tasks</h2>
      <ul>
        ${repeat(
          this.tasks,
          (task) => task.id,
          (task) => html`
            <li>
              <label><input type="checkbox" />${task.label} (${task.id})</label>
            </li>
          `
        )}
      </ul>
      <p>A few of my favorite things</p>
      <ul>
        ${map(
          this.things,
          (thing, index) => html`
            <li>
              ${thing}
              <button @click=${() => this._deleteThing(index)}>Delete</button>
            </li>
          `
        )}
      </ul>
    `;
  }
  _togglePetVisibility() {
    this.includePets = !this.includePets;
  }
  _sort(dir) {
    this.tasks.sort((a, b) => a.label.localeCompare(b.label) * dir);
    this.requestUpdate();
  }
  _deleteThing(index) {
    this.things = this.things.filter((_, i) => i !== index);
  }
}
customElements.define('list-element', ListElement);

const getColor = (row, col) => ((row + col) % 2 ? 'white' : 'black');
const getLabel = (row, col) => `${String.fromCharCode(65 + col)}${8 - row}`;

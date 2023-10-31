import { LitElement, html } from 'lit';
import styles from 'https://cdn.jsdelivr.net/npm/sakura.css/css/sakura.css' assert { type: 'css' }

class BreweryApp extends LitElement {

  static styles = [styles]

  static get properties() {
    return {
      loading: { type: Boolean },
      breweries: { type: Array },
      
    }
  }

  constructor() {
    super();
    this.breweries = [];
  }

  connectedCallback() {
    super.connectedCallback();
    if(!this.breweries.length) {
      this.fetchBreweries();
    }
  }

  async fetchBreweries() {
    this.loading = true
    const response = await fetch('https://api.openbrewerydb.org/v1/breweries/?by_country=England')
    const data = await response.json()
    this.breweries = data
    this.loading = false
  }

  render() {
    const totalVisited = this.breweries.filter(brewery => brewery.visited).length
    const totalBreweries = this.breweries.length
    const totalUnvisited = totalBreweries - totalVisited

    return html`
      <h1>Kewlbrews</h1>
      <h2>Breweries</h2>
      <p>Total: ${totalBreweries} (Visited: ${totalVisited}, un-visited: ${totalUnvisited})</p>
      ${this.loading ? html`<p>Loading...</p>` : null}
      <ul>
        ${this.breweries.map(brewery => html`<li>${brewery.name} <button @click="${() => this.toggleVisitedStatus(brewery)}">${brewery?.visited ? "Mark un-visited" : "Visited"}</button></li>`)}
      </ul>
    `
  }

  toggleVisitedStatus(breweryToUpdate) {
    this.breweries = this.breweries.map(brewery => brewery.id === breweryToUpdate.id ? { ...brewery, visited: !brewery.visited } : brewery)
  }
}

customElements.define('brewery-app', BreweryApp)
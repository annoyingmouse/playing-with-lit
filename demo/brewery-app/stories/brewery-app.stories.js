import { html } from 'lit';
import '../src/brewery-app.js';

export default {
  title: 'BreweryApp',
  component: 'brewery-app',
  argTypes: {
    backgroundColor: { control: 'color' },
  },
};

function Template({ header, backgroundColor }) {
  return html`
    <brewery-app
      style="--brewery-app-background-color: ${backgroundColor || 'white'}"
      .header=${header}
    >
    </brewery-app>
  `;
}

export const App = Template.bind({});
App.args = {
  header: 'My app',
};

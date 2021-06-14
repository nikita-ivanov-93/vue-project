import headline from "./headline";
import {action} from '@storybook/addon-actions'

const methods = {
    onLogout: action("onLogout")
}

export default {
  title: "headline",
  components: {headline}
}

export const defaultView = () => ({
  components: {headline},
  template: `
    <headline @action="onLogout" title="Панель администрирования">
      <h4>Content</h4> 
    </headline>
  `,
  methods
});

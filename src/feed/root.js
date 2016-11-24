import fetch from './modules/fetch-data.js';
import './root.scss';

(function root() {
  fetch('../../mocks/api-response.mock.json')
    .then((res) => res.data)
    .then((data) => {
      const initial = data.filter((element, index) => {
        if (index < 10) return element;
        return false;
      });
      console.log(initial);
    });
}());

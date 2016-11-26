import fetch from './modules/fetch-data';
import createFeed from './modules/dom-feed';
import './root.scss';

(function root() {
  let feed;

  fetch('../../mocks/api-response.mock.json')
    .then((res) => res.data)
    .then((data) => {
      feed = data;
      createFeed(data, 10);
    });

  function closeFilterPanel() {
    document.querySelector('.results-filter__panel').classList.remove('results-filter__panel--open');
  }

  document.querySelector('[load-feed="ALL"]').addEventListener('click', (event) => {
    createFeed(feed);
    event.target.remove();
  });

  document.querySelector('[function="filter"]').addEventListener('click', (event) => {
    const elem = event.target;

    if (elem && elem.matches('button.results-filter__button')) {
      document.querySelector('.results-filter__panel').classList.add('results-filter__panel--open');
    }

    if (elem && elem.matches('strong[load-feed]')) {
      const amount = elem.getAttribute('load-feed');

      createFeed(feed, amount);
      closeFilterPanel();
    }

    if (elem && elem.matches('strong[filterby-likes]')) {
      const amount = elem.getAttribute('filterby-likes');
      const filtered = feed.filter((element) => {
        if (element.user.metadata.connections.likes.total >= amount) return true;
        return false;
      });

      createFeed(filtered);
      closeFilterPanel();
    }

    if (elem && elem.matches('button[filterby-desc="apply"]')) {
      const desc = document.querySelector('input[filterby-desc="input"]').value;
      const filtered = feed.filter((element) => {
        if (element.description && element.description.includes(desc)) return true;
        return false;
      });

      createFeed(filtered);
      closeFilterPanel();
    }

    if (elem && elem.matches('div.results-filter__close')) {
      closeFilterPanel();
    }
  });
}());

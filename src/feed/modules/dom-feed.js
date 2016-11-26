function createFeed(feed, max) {
  const queue = [];
  const container = document.querySelector('.feed');
  let list;
  let node;

  if (max) {
    list = feed.filter((element, index) => {
      if (index < max) return element;
      return false;
    });
  } else {
    list = feed;
  }

  while (node = container.lastChild) container.removeChild(node); // not the best solution since it causes a redraw of all feed elements, but fine for this limited use-case

  list.forEach((elem) => {
    const state = {};
    state.author = {
      name: elem.user.name,
      image: elem.user.pictures ? elem.user.pictures.sizes[3].link : 'https://api.adorable.io/avatars/285/placeholder',
      url: elem.user.link,
    };
    state.video = {
      title: elem.name,
      desc: elem.description ? elem.description : 'No description available',
      url: elem.link,
      totals: {
        comments: elem.metadata.connections.comments.total,
        plays: elem.stats.plays,
        likes: elem.metadata.connections.likes.total,
      },
    };

    const template = `
      <div class="grid__col grid__col--1-of-4 feed__item--left">
        <a href="${state.author.url}"><img class="feed__image" src="${state.author.image}"></a>
        <div class="feed__author-info">
          <p>Author: ${state.author.name}</p>
        </div>
      </div>
      <div class="grid__col grid__col--3-of-4 feed__item--right">
        <a href="${state.video.url}"><h4 class="feed__title">${state.video.title}</h4></a>
        <p class="feed__desc">${state.video.desc}</p>
        <section class="feed__footer">
          <p>Comments: <strong>${state.video.totals.comments}</strong></p>
          <p>Plays: <strong>${state.video.totals.plays}</strong></p>
          <p>Likes: <strong>${state.video.totals.likes}</strong></p>
        </section>
      </div>
    `;

    queue.push(template);
  });

  while (queue.length) {
    const inner = queue.shift();
    const feedItem = document.createElement('li');

    feedItem.classList.add('feed__item');
    feedItem.innerHTML = inner;
    container.appendChild(feedItem);
  }
}

export default createFeed;

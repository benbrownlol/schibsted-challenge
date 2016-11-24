function fetch(url) {
  return window.fetch(url, { method: 'GET' })
    .then(res => res.json())
    .then(json => json)
    .catch((error) => {
      // TODO: add proper error handling
      console.error(error);
    });
}

export default fetch;

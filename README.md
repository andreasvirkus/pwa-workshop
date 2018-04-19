# PWA, SW & WTH?

A workshop to introduce my co-workers to Progressive Web Applications &
ServiceWorkers.

Slides can be found in `/index.html` and they're built with [reveal.js](https://github.com/hakimel/reveal.js).

Various examples can be found in `/examples` (and hopefully will be updated in the future with more
complex additions).

Feel free to use and/or modify this to your liking.

To present:

```
⚡ git clone https://github.com/andreasvirkus/pwa-workshop.git
⚡ cd pwa-workshop/slides
⚡ npm i && npm start
```

See a more detailed usage guide in [/slides](slides/README.md)

## Resources

Great PWA/SW resources to look into (also see slides/index.html References section):

- [deanhume/pwa-tips-tricks](https://github.com/deanhume/pwa-tips-tricks)
- the [spec](https://github.com/w3c/ServiceWorker)
- Webpack [plugin](https://www.npmjs.com/package/sw-precache-webpack-plugin)
- [BackgroundSync](https://github.com/WICG/BackgroundSync/blob/master/explainer.md)
- [WebPush book](https://web-push-book.gauntface.com/)
  - [Common notification patterns](https://web-push-book.gauntface.com/chapter-05/04-common-notification-patterns/)
- [MDN/WebWorkers](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers")
- [PonyFoo articles](https://ponyfoo.com/articles/tagged/serviceworker")
- [serviceworkers/list](https://jakearchibald.github.io/isserviceworkerready/resources.html)
- [Google devs/service-workers](https://developers.google.com/web/fundamentals/primers/service-workers/)

## TODO:
- ~Example of offline support~
- ~Example & workshop using BackgroundSync~
- ~Example & workshop using notifications~
- Example & workshop using scoped workers
- Example & workshop of Web Push + VAPID, PushManager
  - An example using [web-push](https://github.com/web-push-libs/web-push)
  - https://thihara.github.io/Web-Push/
- Example & workshop about realtime data updates, e.g. updating a /json endpoint without reloads (https://blog.pusher.com/offline-and-realtime/)
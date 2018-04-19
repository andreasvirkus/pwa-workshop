const version = 'v1::'
const name = 'background'

self.addEventListener('install', event => {
  event.waitUntil(
    caches
      .open(version + name)
      .then(cache =>
        cache.addAll([
          '/',
          '/css/style.css',
          '/js/script.js'
        ]))
  )
})

self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') {
    console.log('WORKER: fetch event ignored.', event.request.method, event.request.url)
    return
  }

  event.respondWith(
    caches
      .match(event.request)
      .then(cached => {
        const networked = fetch(event.request)
          .then(fetchedFromNetwork, unableToResolve)
          .catch(unableToResolve)

        return cached || networked

        function fetchedFromNetwork(response) {
          const cacheCopy = response.clone()

          caches
            .open(version + name)
            .then(cache => {
              cache.put(event.request, cacheCopy)
            })

          return response
        }

        function unableToResolve () {
          console.log('WORKER: fetch request failed in both cache and network.')

          return new Response('<h1>Service Unavailable</h1>', {
            status: 503,
            statusText: 'Service Unavailable',
            headers: new Headers({
              'Content-Type': 'text/html'
            })
          })
        }
      })
  )
})

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(
        keys.filter(key => !key.startsWith(version)).map(key => caches.delete(key))
      ))
  )
})

self.addEventListener('sync', event => {
  console.log('WORKER sync tag:', event.tag);
  event.tag == 'image-fetch-2' && event.waitUntil(fetchDogImage())
  event.tag === 'sync-status' && console.log('WORKER: Keeping everything up-to-date')
})

function fetchDogImage () {
  return fetch('/hasLanded.png')
    .then(res => console.log('WORKER: Request successful', res))
    // bad
    // .catch(error => console.error('WORKER: Request failed', error))
    // good
    .catch(error => {
      console.error('WORKER: Request failed; scheduled for next time', error)
      return Promise.reject(error) // throw error
    })
}

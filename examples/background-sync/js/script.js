(function() {
  const allNavItems = $('.main-nav li')
  const allTabs = $('.tab')
  const reqButton = $('#request-button')

  allNavItems.on('click', function(e) {
    e.preventDefault()

    allNavItems.removeClass('active')
    allTabs.removeClass('active')

    $(this).addClass("active");

    const selector = $(this).find("a").attr("href");
    $(selector).addClass("active");
  })

  function isOnline () {
    const connectionStatus = $('#connection-status');
    const status = navigator.onLine
     ? '🍏 You are currently online!'
     : '🍎 You are currently offline.<br> Any requests made will be queued and synced as soon as you are connected again.'

    connectionStatus.html(status)
  }

  window.addEventListener('online', isOnline);
  window.addEventListener('offline', isOnline);
  isOnline();

  if ('serviceWorker' in navigator) {
    console.log('CLIENT: service worker registration in progress.')
    navigator.serviceWorker.register('/worker.js')
      .then(reg => navigator.serviceWorker.ready)
      .then(reg => {
        // if ('sync' in reg) {}
        console.log('CLIENT: registering sync');
        reqButton.on('click', () => {
          reg.sync.register('image-fetch-2').then(() => {
              console.log('CLIENT: sync registered')
          })
        })
      })
      .catch(err => console.error('CLIENT: service worker registration failure:', err))
  } else {
    reqButton.on('click', () => {
      console.log('CLIENT: Fallback to fetch the image as usual')
    })
  }

  navigator.serviceWorker.ready.then(reg => reg.sync.register('sync-status'))
})()

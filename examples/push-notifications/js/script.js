(function() {
  const allNavItems = $('.main-nav li')
  const allTabs = $('.tab')
  const regButton = $('#register')

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
     : '🍎 You are currently offline. Any requests made will be queued and synced as soon as you are connected again.'

    connectionStatus.text(status)
  }

  window.addEventListener('online', isOnline);
  window.addEventListener('offline', isOnline);
  isOnline();

  if ('serviceWorker' in navigator) {
    console.log('CLIENT: service worker registration in progress.')
    navigator.serviceWorker.register('/worker.js')
      .then(reg => navigator.serviceWorker.ready)
      .then(reg => {
        // Notification.requestPermission();
        console.log('CLIENT: request notification permission');

        regButton.on('click', () => {
          event.preventDefault()
          Notification.requestPermission(result => {
            if (result !== 'granted') return Promise.reject(Error("Denied notification permission")) // useful tracking breakpoint
          })
          .then(() => navigator.serviceWorker.ready)
          .then(reg => reg.sync.register('speakerUpdate'))
          .then(() => console.log('CLIENT: Sync registered'))
          .catch(err => console.error('CLIENT: It broke', err.message))
        })


      })
      .catch(err => console.error('CLIENT: service worker registration failure:', err))
  } else {
    regButton.on('click', () => {
      console.log('CLIENT: Will try to register straight away')
    })
  }
})()

(function() {
  const allNavItems = $('.main-nav li')
  const allTabs = $('.tab')
  const regButton = $('#register')
  const speakers = $('#speakers-list')

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

        navigator.serviceWorker.addEventListener('message', event => {
          console.log('CLIENT: Got a message - ', event.data)
          speakers.append(`<li>${event.data}</li>`)
        })

        regButton.on('click', () => {
          event.preventDefault()
          Notification.requestPermission(result => {
            // Useful tracking breakpoint
            if (result !== 'granted')
              return Promise.reject(Error("Denied notification permission"))
          })
          .then(() => navigator.serviceWorker.ready)
          .then(reg => {
            // Fake time passing
            setTimeout(() => {
              reg.sync.register('speakerUpdate')
            }, 3000)
          })
        })
      })
      .catch(err => console.error('CLIENT: service worker registration failure:', err))
  } else {
    regButton.on('click', () => {
      console.log('CLIENT: Will try to register straight away')
    })
  }

})()

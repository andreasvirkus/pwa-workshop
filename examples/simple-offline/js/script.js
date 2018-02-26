(function() {
  const allNavItems = $('.main-nav li')
  const allTabs = $('.tab')

  allNavItems.on('click', function(e) {
    e.preventDefault()

    allNavItems.removeClass('active')
    allTabs.removeClass('active')

    $(this).addClass("active");

    const selector = $(this).find("a").attr("href");
    $(selector).addClass("active");
  })

  if ('serviceWorker' in navigator) {
    console.log('CLIENT: service worker registration in progress.')
    navigator.serviceWorker.register('/worker.js')
      .then(reg => console.log('CLIENT: service worker registration complete:', reg))
      .catch(err => console.error('CLIENT: service worker registration failure:', err))
  }
})()
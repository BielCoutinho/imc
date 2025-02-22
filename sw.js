self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open('static')
        .then((cache) => {
             
            cache.add('./imc/')
            cache.add('./imc/index.html')
            cache.add('./imc/styles.css')  
            cache.add('./imc/app.js')
            cache.add('./imc/img/gym48.png')
            cache.add('./imc/img/gym128.png')
            cache.add('./imc/manifest.json')  

            
        })
    );
});

// Ativação
self.addEventListener('activate', (event) => {
    console.log("Ativando o service worker", event)
    return self.clients.claim()
 })
 // Interceptação (solicitações https servindo em cache quando off-line)
 self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
            .then((response) => {
                if (response) {
                    return response
                } else {
                    return fetch(event.request)
                }
            })
    )
 })
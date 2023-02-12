// /// <reference no-default-lib="true"/>
/// <reference lib="esnext" />
/// <reference lib="webworker" />

const sw = self as unknown as ServiceWorkerGlobalScope & typeof globalThis;

const log  = (...args: any[]) => {
  console.log('[SW]: ',...args);
}

sw.addEventListener('install', (event) => {
  // ...
  log('installed', event);
  sw.clients.matchAll().then(clients => {
    clients.forEach(client => {
      client.postMessage({
        type: 'start',
      });
    });
  });

})
sw.addEventListener('activate', event => {
  log('activated', event);
    sw.clients.claim();
    sw.clients.matchAll().then(clients => {
      clients.forEach(client => {
        client.postMessage({
          type: 'start',
        });
      });
    });
});




sw.addEventListener('message', event => {
  log('message received');
  
  if (event.data.type === 'start') {
    setTimeout(() => {
      const jsonData = {
        data: [
          { id: 1, name: 'John' },
          { id: 2, name: 'Jane' },
          { id: 3, name: 'Jim' },
        ]
      };

      sw.clients.matchAll().then(clients => {
        clients.forEach(client => {
          client.postMessage({
            type: 'done',
            data: jsonData
          });
        });
      });
    }, 3000);
  }
});

export {}
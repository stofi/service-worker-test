// index.js
const log  = (...args: any[]) => {
  console.log('[WINDOW]: ',...args);
}




export const awaitController = () => new Promise<ServiceWorker>(async (resolve) => {
  log("unregistering");
  const registrations = await navigator.serviceWorker.getRegistrations()
  for (let registration of registrations) {
    await registration.unregister();
  }

  log("registering");

  await navigator.serviceWorker.register('/sw.js')


  log("awaiting controller");
  navigator.serviceWorker.addEventListener("controllerchange", () => {
      log("controller changed");
      resolve(navigator.serviceWorker.controller);
  });

})

navigator.serviceWorker.addEventListener('message', event => {
  if (event.data.type === 'done') {
    const jsonData = event.data.data
    // process the JSON data as needed
    log(jsonData);
  }
   if (event.data.type === 'start') {
    log('started');
  }
});



export function startCalculation(sw: ServiceWorker) {
  if (!sw) {
    console.error('Service worker is not supported in this browser');
    return;
  }

  sw.postMessage({
    type: 'start',
    data: {
      // any data you want to pass to the service worker
    }
  });

  log('Message sent to service worker');
}

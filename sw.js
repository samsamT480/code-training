const C='ct-v1';
self.addEventListener('install',e=>{self.skipWaiting();e.waitUntil(caches.open(C).then(c=>c.addAll(['./','index.html'])).catch(()=>{}))});
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!=C).map(x=>caches.delete(x)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',e=>{const q=e.request;if(q.method!='GET'||!q.url.startsWith(self.location.origin)||q.url.includes('?'))return;
e.respondWith(fetch(q).then(r=>{const cp=r.clone();caches.open(C).then(c=>c.put(q,cp));return r}).catch(()=>caches.match(q).then(m=>m||caches.match('index.html'))))});

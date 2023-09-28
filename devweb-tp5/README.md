PARTIE 1 :

question 1 :
Voici la liste des en-tête de la réponse HTTP du serveur (nous la récupérons grâce a la console (F12) et dans la case Network) :
HTTP/1.1 200 OK
Date: Fri, 22 Sep 2023 06:17:10 GMT
Connection: keep-alive
Keep-Alive: timeout=5
Transfer-Encoding: chunked

question 1.2 :
On a modifier la fonction requestListener et dans celle-ci on affiche en plus "Content-Type" avec comme valeur "application/json" puis on affiche un message a la fin de la reponse

HTTP/1.1 200 OK
Content-Type: application/json
Date: Fri, 22 Sep 2023 06:23:13 GMT
Connection: keep-alive
Keep-Alive: timeout=5
Content-Length: 20

question 1.3 :
La réponse reçu par le client ne contient rien car il cherche un fichier index.html qui n'existe pas (nom du fichier actuelle __index.html)

question 1.4 :
Voici l'erreur afficher dans la console quand on modifie la fonction requestListener, on cherchant sur le site https://nodejs.org/api on trouve le code d'erreur et cela signifie qu'il cherche un fichier qui n'existe pas:

[Error: ENOENT: no such file or directory, open 'C:\Users\User\Desktop\université\L2\semestre 4\developpement web\devweb-tp5\index.html'] {
  errno: -4058,
  code: 'ENOENT',
  syscall: 'open',
  path: 'C:\\Users\\User\\Desktop\\université\\L2\\semestre 4\\developpement web\\devweb-tp5\\index.html'
}

question 1.5 :
Voici le code de requestListener en Promise.catch() :

function requestListener(request, response) {

  fs.readFile('index.html', 'utf8')
    .then(contents => {
      response.writeHead(200);
      response.end(contents);
    })
    .catch(err => {
      console.error(err);
      response.writeHead(500);
      response.end('SERVER ERROR'); 
    });

}

  Et la fonction en async/await : function
async function requestListener(_request, response) {
  try{
    const contenu = await fs.readFile("index.html", "utf8")
    response.setHeader("Content-Type", "text/html");
    response.writeHead(200);
    response.end(contenu);
  } catch(error){
    console.error(error);
    response.writeHead(500);
    response.end("Server ERROR");
  }
}

question 1.6 :
npm install cross-env --save :
Cette commande ajoute le package "cross-env" a toute nos dépendances de production du projet

npm install nodemon --save-dev :
Cette commande ajoute le package "nodemon" a toute nos dependances de développement du projet 


Question 1.7 :
http-dev :
Ce script utilise "cross-env" pour definir une variable d'environnement "NODE_ENV" sur "development" puis execute le fichier "server-htpp.mjs" avec nodemon. Cela signigie que quand on éxécute la commande "npm run http-dev" notre serveur sera lancer en mode developpement et a un redemarrage automatique a chaque modification effectuer dans les fichiers.

http-prod :
Ce script utilise "cross-env" pour definir une variable d'environnement "NODE_ENV" sur "production" puis execute le fichier "server-http.mjs" avec node. Cela signifie que quand on éxécute la commande "npm run http-prod" notre serveur sera lancer en mode production et donc n'a pas de démarrage automatique a chaque modification effectuer dans les fichiers

Pour les différences, on peux constater que "http-dev" est fait pour être utiliser en mode dévéloppement car il a un redémarrage automatique alors que "http-prod est fais pour être utiliser en mode production et donc n'a pas de redemarrage automatique, on est obliger de redemarrer le serveur pour appliquer les modifications.

Question 1.8 :
http://localhost:8000/index.html : Hello Again ! this is served from a file
http://localhost:8000/random.html : 39
http://localhost:8000/ : 404: NOT FOUND
http://localhost:8000/dont-exist : 404: NOT FOUND

PARTIE 2 :

Question 2.1 :
Voici les urls des documentations de chacun des modules installés par la commande "npm install --save express http-errors loglevel morgan"
https://www.npmjs.com/package/morgan
https://www.npmjs.com/package/http-errors
https://tidelift.com/funding/github/npm/loglevel  
https://www.npmjs.com/package/express

Question 2.2 :
Pour le npm run express-prod:
http://localhost:8000/index.html: Fonctionne renvoie le site
http://localhost:8000/random.html: Fonctionne pas renvoie "Cannot GET /random.html"
http://localhost:8000/: Fonctionne renvoie le site

Pour le npmrun express-dev:
http://localhost:8000/index.html: Fonctionne renvoie le site
http://localhost:8000/random.html: Fonctionne renvoie des chiffres randoms
http://localhost:8000/: Fonctionne renvoie le site

Question 2.3 :
http://localhost:8000/index.html :
HTTP/1.1 200 OK
X-Powered-By: Express 
Accept-Ranges: bytes
Cache-Control: public, max-age=0 
Last-Modified: Fri, 22 Sep 2023 05:47:25 GMT 
ETag: W/"380-18abb6dbad1"
Content-Type: text/html; charset=UTF-8
Content-Length: 896
Date: Wed, 27 Sep 2023 22:45:35 GMT
Connection: keep-alive
Keep-Alive: timeout=5

http://localhost:8000/random.html :
HTTP/1.1 200 OK
X-Powered-By: Express 
Content-Type: text/html; charset=utf-8
Content-Length: 141
ETag: W/"8d-ZrOGjypogYPZgtfOCocw7bjfXsE" 
Date: Wed, 27 Sep 2023 22:44:52 GMT
Connection: keep-alive
Keep-Alive: timeout=5
http://localhost:8000/ :
HTTP/1.1 200 OK
X-Powered-By: Express
Accept-Ranges: bytes 
Cache-Control: public, max-age=0
Last-Modified: Fri, 22 Sep 2023 05:47:25 GMT
ETag: W/"380-18abb6dbad1"
Content-Type: text/html; charset=UTF-8
Content-Length: 896
Date: Wed, 27 Sep 2023 22:44:18 GMT
Connection: keep-alive
Keep-Alive: timeout=5

Dans les 3 en-têtes ci dessus on peux voir que nous avonsune nouvelle ligne par rapport aux autres en-têtes "X-Powered-By : Express"

Question 2.4 :
L'événement "listening" dans le contexte de cet extrait de code est déclenché lorsque le serveur HTTP commence à écouter sur le port spécifié avec succès.

Question 2.5 :
Il prends index.html par défaut

Question 2.6 :
HTTP/1.1 200 OK
X-Powered-By: Express
Accept-Ranges: bytes
Cache-Control: public, max-age=0
Last-Modified: Thu, 28 Sep 2023 02:34:06 GMT
ETag: W/"e5-18ad9a2e642"
Content-Type: text/html; charset=UTF-8
Content-Length: 229
Date: Thu, 28 Sep 2023 08:00:08 GMT
Connection: keep-alive
Keep-Alive: timeout=5

Question 2.7 :
Oui l'affichage change bien etre le mode production et le mode development.

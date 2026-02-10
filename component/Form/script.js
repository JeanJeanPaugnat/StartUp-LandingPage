/*  Composant Hero */

/* on importe les fonctions loadTemplate et loadJSON depuis le module /js/loader.js */
import { loadTemplate, loadJSON } from '../../js/loader.js';

/*  
    Remarque : si Hero était un composant qui en utilisait un autre, il serait tout à fait possible
    d'importer celui-ci dans ce module.
*/

/* on charge le template du composant Hero */
let template = await loadTemplate('./component/Form/template.html');

/* on crée un objet Hero vide qui va symboliser notre composant */
let Form = {}; 

/*  Hero.format
    @param obj: object, un objet JS contenant les données à injecter dans le template
    @return string, le template HTML formaté avec les données de l'objet
*/
Form.format =  function(obj) {
    let html = template;
    html = html.replace('{{title}}', obj.title);
    html = html.replace('{{text}}', obj.text);
    html = html.replace('{{placeholder}}', obj.placeholder);
    html = html.replace('{{bouton}}', obj.bouton);
    return html;
}

/*  Hero.render
    @param selector: string, un sélecteur CSS pour cibler l'élément de la page où injecter le composant une fois formaté
    @param jsonFilename: string, le chemin vers le fichier JSON contenant les données à injecter dans le template pour un
    ou plusieurs composant Hero (voir le fichier data/hero.json)

    Note : pour async et await, voir les explications dans le fichier js/loader.js

    Note bis : Hero.render est donc capable d'afficher plusieurs composants Hero d'un coup si on lui fournit un tableau
    d'objets, chaque objet contenant les données à injecter dans le template pour un composant Hero. C'est similaire à la
    fonction renderRecipes de l'exercice 6 sur les recettes de cuisine. Si j'ai besoin de rendre plusieurs composants Hero,
    et bien c'est possible. Et si je ne veux en afficher qu'un, c'est possible aussi, il suffira de fournir un tableau avec 
    un seil objet de données Hero dedans. C'est plus flexible ainsi.
*/
Form.render = async function(selector, jsonFilename){
    // on charge les données depuis le fichier JSON
    let data = await loadJSON(jsonFilename);

    // on formate un composant Hero pour chaque objet du tableau
    let html = '';
    for(let obj of data){
        html += Form.format(obj); // on concatène les HTML des composants formatés  
    }
    
    // on injecte le HTML dans le DOM
    let where = document.querySelector(selector); // on cible l'élément où injecter le HTML
    where.innerHTML = where.innerHTML + html; // on ajoute le HTML à la fin du contenu de l'élément ciblé par le sélecteur
}

// on exporte le composant Hero pour pouvoir l'utiliser ailleurs dans un autre modules JS
export {Form}

// Note : seul Hero est exporté (et donc Hero.render et Hero.format)
// La variable template n'est pas exportée, elle n'est donc pas accessible depuis l'extérieur (et c'est tant mieux)
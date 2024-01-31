# Mon vieux Grimoire

Projet n°7 du parcours Développeur Web d'OpenClassrooms 

## Objectif

Développer le back-end du site "Mon vieux Grimoire" en utilisant Node.js, Express et MongoDB.

## Screenshots

![Capture d'écran](/Grimoire-Cover.webp)

## Prérequis

Vous devez avoir Node.js et npm installés localement sur votre machine.</br>
Il est conseillé d'utiliser MongoDB Atlas pour la base de données.</br> 
Il est conseillé d'utiliser la version LTS de Node.js.</br>

## Installation du front-end

Le répository qui contient le front-end est disponible à l'adresse suivante :

https://github.com/OpenClassrooms-Student-Center/P7-Dev-Web-livres

* Clonez ce repository dans un nouveau dossier "frontend" à la racine du répertoire de votre choix.
* Depuis le dossier "frontend" du projet, exécutez `npm install`.


## Installation du back-end

* Clonez ce repository à la racine du répertoire créé précédemment.
* Depuis le dossier "backend" du projet, exécutez `npm install`.
* Créer le fichier .env pour configurer le port et la base de données.</br>
Un fichier .env.example est disponible pour vous aider.

## Démarrage du serveur

Depuis le dossier "backend" du projet, exécutez `nodemon server`.</br>
Depuis le dossier "frontend" du projet, exécutez `npm start`.

## Utilisation de l'API

### Création d'un compte utilisateur - Sécurité
Lors de la création d'un nouveau compte utilisateur, le mot de passe doit contenir au moins 8 caractères dont au moins une lettre minuscule, une lettre majuscule, un chiffre et un caractère spécial.

### Création d'un livre 
Lors de la création d'un nouveau livre, tous les champs sont obligatoires.</br>
Si aucune note n'est renseignée, la note par défaut est 0.

### Erreurs API
Les erreurs éventuelles sont renvoyées telles qu'elles se sont produites, sans modification ni ajout.</br>

### Green Code
Afin d'améliorer le poids des images, le plugin "sharp" est utilisé pour redimensionner les images et les compresser au format webp.


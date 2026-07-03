# ZCorps - Gestion de Fiches de Personnage

Une application web HTML5 sans serveur pour créer et gérer des fiches de personnage pour le JDR ZCorps.

## Fonctionnalités

- **Création de fiches** : Créez des fiches de personnage avec nom, type (Joueur/PNJ), caractéristiques et compétences
- **Gestion des caractéristiques** : Répartissez 6D entre 6 caractéristiques (base 2D chacune)
- **Gestion des compétences** : Choisissez 12 compétences et répartissez 7D supplémentaires
- **Système de dés** : Cliquez sur une compétence pour lancer les dés (D6) correspondant à la somme de l'attribut + compétence
- **Stockage local** : Toutes les fiches sont sauvegardées dans le navigateur (localStorage)

## Structure des Caractéristiques

Les 6 caractéristiques principales avec leurs descriptions :

1. **Agilité** : Équilibre, rapidité, souplesse et capacités motrices
2. **Adresse** : Coordination œil-main, manipulation d'objets
3. **Puissance** : Résistance aux dégâts et puissance physique
4. **Connaissances** : Mémoire, apprentissage, savoir et culture
5. **Perception** : Vivacité d'esprit et attention aux détails
6. **Présence** : Force émotionnelle, personnalité, charisme et volonté

## Structure des Compétences

Chaque caractéristique a des compétences associées :

### Agilité
- Acrobaties, Bagarre, Contorsion, Discrétion, Équitation, Esquive, Grimper, Mêlée, Sauter

### Adresse
- Armes à feu, Arme de jet, Crochetage, Dextérité, Lancer, Pilotage, Réparer

### Puissance
- Courir, Endurance, Nager, Soulever

### Connaissances
- Affaires, Contrefaçon, Démolition, Électronique, Érudition, Informatique, Langues, Médecine, Navigation, Sécurité, Sciences occultes

### Perception
- Art, Camouflage, Chercher, Connaissance de la Rue, Investigation, Jeux, Pister, Survie

### Présence
- Charmer, Commander, Déguisement, Dressage, Empathie, Escroquerie, Intimidation, Persuasion, Volonté

## Règles de Création

### Caractéristiques
- Vous avez **6D (points)** à répartir
- Chaque caractéristique commence à **2D par défaut**
- Exemple : Vous pouvez avoir toutes vos caractéristiques à 3D en répartissant vos 6D

### Compétences
- Choisissez **12 compétences ouvertes** (qui seront à 1D par défaut)
- Attribuez **7D supplémentaires** sur l'ensemble de vos compétences
- Les compétences choisies commencent à 1D par défaut

### Tests de Compétence
- Lorsque vous lancez un test de compétence, vous ajoutez la valeur de la caractéristique associée et la compétence
- Vous lancez ensuite autant de dés à 6 faces que cette valeur
- Exemple : Arthur a 3D en Agilité et 3D en Discrétion → il lancera 6D6 (3+3)

## Utilisation

1. **Créer une nouvelle fiche** : Cliquez sur "Nouvelle fiche"
2. **Remplir les informations** :
   - Nom du personnage
   - Type (Joueur ou PNJ)
   - Répartir les 6D entre les caractéristiques (total doit faire 12D)
   - Sélectionner 12 compétences
   - Répartir les 7D supplémentaires entre les compétences
3. **Sauvegarder** : Cliquez sur "Sauvegarder la fiche"
4. **Utiliser une compétence** : Cliquez sur une compétence dans la fiche pour lancer les dés

## Technologie

- **HTML5** : Structure de la page
- **CSS3** : Styles et mise en page responsive
- **JavaScript** : Logique de l'application
- **localStorage** : Stockage des données dans le navigateur

## Compatibilité

L'application fonctionne sur tous les navigateurs modernes :
- Chrome
- Firefox
- Safari
- Edge
- Opera

## Installation

Aucune installation nécessaire ! Il suffit d'ouvrir le fichier `index.html` dans un navigateur web.

## Déploiement

Pour déployer l'application :
1. Copiez tous les fichiers sur un serveur web
2. Accédez à l'URL du fichier `index.html`

Ou simplement ouvrez le fichier `index.html` directement depuis votre ordinateur.

## Auteur

Application créée pour le JDR ZCorps.

## Licence

Libre d'utilisation pour un usage personnel ou dans le cadre du JDR ZCorps.

Chemin d'utilisation:

c'est un site publique, donc nous ne nous soucions que des utilisateurs lambda (les chercheurs sont des utilisateurs lambda s'ils utilisent ce site).

Un utilisateur lambda doit pouvoir

- arriver sur le site et voir la page de garde
  - tâche 1: porter l'esthétique générale du site actuel
  - tâche 2: choisir un mode d'hébergement
  - tâche 3: coordonner avec le CI et toute personne impliquée, le portage du nom de domaine theatresdesociete.ch
- basculer vers le mode "base de données"
  - tâche 4: repenser l'intégration "base de données"
- accéder à un calendrier des représentations
  - tâche 5: mettre en place l'infrastructure pour accéder aux données dans knora
  - tâche 6: mettre en place un cache pour les requêtes coûteuses
  - tâche 7: intégrer les requêtes de liste des années
  - tâche 8: porter la page de résultats
- sélectionner une année et parvenir à une liste de représentations
  - tâche 9: requête pour les listes de représentations par année (à priori, pas de cache nécessaire)
  - tâche 10: porter la page de liste de représentations
- choisir une représentation dans une liste et afficher la représentation
  - tâche 11: requête pour accéder aux détails d'une représentation
  - tâche 12: porter la page d'affichage d'une représentation (existe-t-elle?)
- afficher les pages connexes à une représentation (auteur et lieu)
  - tâche 13: requête pour accéder aux détails des pages connexes
  - tâche 14: porter les pages connexes
- accéder à une carte des lieux de représentations
  - tâche 15: requête pour accéder aux lieux
  - tâche 16: mise en place d'un cache pour les lieux
  - tâche 17: portage de la page, intégration leaflet
- accéder à un module de recherche avancée
  - tâche 18: penser le mode de recherche, quels champs sont interrogeables (titre de pièce, nom d'auteur, etc)
  - tâche 19: requêtes pour accéder aux représentations, lieux, personnes, en fonctions
  - tâche 20: mettre en place la page
- voir des informations à jour
  - tâche 21: procédure de rafraichissement du cache

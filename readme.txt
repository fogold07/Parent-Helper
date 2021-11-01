Idée maitresse : 
Un site qui permet de partager les bonnes idées et les bonnes pratiques pour aider les parents à réussir l'éducation de leurs enfants.
On apprend plein de choses à l'école, sauf à gérer des enfants. 

PRINCIPALES FONCTIONNALITES DU SITE : 
***** Gestion des utilisateurs ****
- créer un compte utlisateur ;
- déconnecter un utilisateur ;

*** Gestion des articles ****
- créer un article ; 
- consulter tous les articles postés ;
- consulter tous les articles postés par catégories (vie de famille, communication, gestion émotionnelle) ;
- commenter un article --> fonction à consolider ;
- supprimer un article ;

*** fonctionnalités du CdC non intégrées ***
- noter un article ; --> NON INTEGRE
- mettre un article en favori. --> NON INTEGRE

ACTIONS EN FONCTION DU PROFIL :
*** Profil visiteur ****
- consulter les articles ; 
- commenter un article ; 

*** Avec un compte d'utilisateur ****
- créer un nouvel article ;
- supprimer un article ;
- consulter les articles ;
- commenter un article ; 

**** LES OBJETS ******
- utilisateur = email, pseudo (username), mot de passe ;
- article = titre, catégory, contenu, auteur (lié au pseudo), date création, commentaires ;
- commentaire = nom auteur (champ libre), contenu, date création;


LES PRINCIPALES ETAPES POUR LANCER L'APPLICATION
NB: Pas besoin de compte admin pour créer les articles, toute personne peut créer des articles après enregistrement et authentification au préalable.
- installer les dépendencies ; 
- lancer l'appli avec la cmd "npm start" (la BdD est alors initialisée);

Sans créer de compte : 
- consulter les articles ;
- commenter les articles
    ( le pseudo est demandé par défaut si pas de valeur, renvoie un champ vide.
    pb affichage : On peut voir les commentaires seulement après en avoir posté un)  ;


créer un utilisateur :
- cliquer sur Sign up et renseigner les champs
    - adresse mail + pseudo + password ;
- connecter vous avec le pseudo et le password ;
- créer un nouvel article en remplissant les champs ;
- consulter les artciles ; 
- supprimer un articles (gestion des droits de suppression non prise en compte);

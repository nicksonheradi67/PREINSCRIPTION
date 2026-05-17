# UDBL PreInscription - Documentation du projet

> Plateforme officielle de pré-inscription de l'Université Don Bosco de Lubumbashi  
> Auteur : **HERADI KIYOMBO NICKSON** - BAC 2 MSI

---

## Architecture du projet

```
udbl-preinscription/
├── index.html                  ← Page principale
├── preinscription.html         ← Formulaire de pré-inscription
├── comment ça marche.html      ← Guide du parcours candidat
├── fonctionnalités.html        ← Présentation des fonctionnalités
├── style.css                   ← Feuille de style unique
├── js/                         ← Scripts JavaScript modulaires
│   ├── main.js                 ← Comportements globaux
│   ├── chatbot.js              ← Logique du chatbot
│   └── form.js                 ← Validation du formulaire
├── composants/                 ← 2 snippets HTML réutilisables
│   ├── navigation.html         ← Navbar + footer
│   └── contenu-accueil.html    ← Hero + stats
└── logo/                       ← Logo de l'université
```

---

## Lancer le projet

Ouvrez simplement `index.html` dans un navigateur, ou servez le dossier via un serveur local :

```bash
python3 -m http.server 8080
```

Puis ouvrir → `http://localhost:8080`

---

## Modules JavaScript

### `chatbot.js`
- Base de connaissances extensible
- Détection par mots-clés
- Réponse simulée avec délai

### `form.js`
- Validation côté client
- Affichage des erreurs par champ
- Préparé pour une connexion API

### `main.js`
- Ombre dynamique de la navbar au scroll
- Smooth scroll pour les ancres internes
- Reveal au scroll via `IntersectionObserver`

---

## Évolutions possibles

- [ ] Espace candidat
- [ ] Suivi de dossier
- [ ] Tableau de bord admin
- [ ] Intégration Firebase / Supabase
- [ ] Chatbot connecté à une vraie API
- [ ] Upload de fichiers
- [ ] Mode sombre

---

*© 2025 Université Don Bosco de Lubumbashi*

# dymavue

This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=johnsoncodehk.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=johnsoncodehk.vscode-typescript-vue-plugin).

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=johnsoncodehk.vscode-typescript-vue-plugin) to make the TypeScript language service aware of `.vue` types.

If the standalone TypeScript plugin doesn't feel fast enough to you, Volar has also implemented a [Take Over Mode](https://github.com/johnsoncodehk/volar/discussions/471#discussioncomment-1361669) that is more performant. You can enable it by the following steps:

1. Disable the built-in TypeScript Extension
    1) Run `Extensions: Show Built-in Extensions` from VSCode's command palette
    2) Find `TypeScript and JavaScript Language Features`, right click and select `Disable (Workspace)`
2. Reload the VSCode window by running `Developer: Reload Window` from the command palette.

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```


### Lancer le site en Local:   http://localhost:5173/
```sh
npm run dev
```


# CI/CD avec Docker, GitHub Actions, Cypress et OVH

Ce projet met en place un pipeline CI/CD complet pour une application fullstack (VueJS + NodeJS + MongoDB), avec tests automatisés, build d'images Docker, tests E2E via Cypress, et déploiement sur un VPS OVH.

---

## 🌐 Technologies principales

- **Frontend** : Vue 3, Vite  
- **Backend** : NodeJS, Express, MongoDB  
- **Tests unitaires** : Vitest (frontend), Jest (backend)  
- **Tests E2E** : Cypress  
- **CI/CD** : GitHub Actions + Docker + GitHub Container Registry (GHCR)  
- **Déploiement** : Serveur VPS OVH (Debian 11)

---

## ⚙️ Structure des jobs GitHub Actions

| Job                  | Description                                                                 |
|----------------------|-----------------------------------------------------------------------------|
| `tests_frontend`     | Lint + analyse des dépendances + tests unitaires du frontend avec Vitest   |
| `tests_backend`      | Tests unitaires du backend avec Jest                                        |
| `build`              | Build et push des images Docker (frontend & backend) vers GHCR              |
| `e2e`                | Lance Cypress avec `docker-compose` pour tester frontend + backend ensemble |
| `deploy_production`  | Déploiement sur OVH si `e2e` est validé                                     |

---

## 🔧 Détails des problèmes résolus

### 1. ❌ Cypress ne trouvait pas les contenus des pages VueJS
- **Problème** : Cypress ne trouvait pas le texte "Home", "Connexion", "Inscription"
- **Cause** : l'app était buildée avec `base: /realisations/cicd-docker/`, donc cassée en environnement test
- **Solution** : utilisation de `--build-arg VITE_BASE=/` pour les tests

### 2. ❌ Variable d’environnement ignorée dans le `Dockerfile`
- **Problème** : le `Dockerfile` ne prenait pas en compte les build args
- **Solution** : ajout de :
  ```dockerfile
  ARG VITE_BASE
  ENV VITE_BASE=$VITE_BASE
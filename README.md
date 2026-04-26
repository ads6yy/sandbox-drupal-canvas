# Sandbox Drupal Canvas

Ce dépôt est une **implémentation de référence** pour un site Drupal CMS basé sur le système de composants **Canvas / Mercury**, avec l'identité visuelle fictive **IpsoSenso**.

Il sert de base de code et de bac à sable pour expérimenter les Single Directory Components (SDC), la suite AI de Drupal, et les bonnes pratiques Composer/Docker.

![Drupal](https://img.shields.io/badge/drupal-%230678BE.svg?style=for-the-badge&logo=drupal&logoColor=white)
![PHP](https://img.shields.io/badge/php-%23777BB4.svg?style=for-the-badge&logo=php&logoColor=white)
![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)
![MariaDB](https://img.shields.io/badge/mariadb-%23003545.svg?style=for-the-badge&logo=mariadb&logoColor=white)
![Nginx](https://img.shields.io/badge/nginx-%23009639.svg?style=for-the-badge&logo=nginx&logoColor=white)

## 🛠️ Tech Stack

* **CMS :** Drupal CMS 2.1.1 / Drupal Core 11.3+
* **Langage :** PHP 8.4
* **Base de données :** MariaDB
* **Serveur web :** Nginx
* **Environnement :** Docker Compose
* **Dépendances :** Composer
* **Templating :** Twig + SDC (Single Directory Components)
* **Thème admin :** Gin

## 🚀 Quick Start

### Prérequis

* [Docker](https://docs.docker.com/get-docker/) et [Docker Compose](https://docs.docker.com/compose/install/) installés sur votre machine

### Démarrage

```bash
# Copier et remplir le fichier d'environnement
cp deploy/.env.example deploy/.env

# Construire et lancer la stack (MariaDB + PHP-FPM + Nginx)
cd deploy && docker compose up -d --build

# Installer les dépendances PHP
docker compose exec php composer install

# Importer la configuration depuis le dépôt
docker compose exec php vendor/bin/drush config:import --yes

# Appliquer les mises à jour de base de données
docker compose exec php vendor/bin/drush update:db --yes

# Vider le cache
docker compose exec php vendor/bin/drush cache:rebuild
```

Le site est accessible sur `http://localhost:8702`.

### Commandes Drush utiles

```bash
# Obtenir un lien de connexion admin
docker compose exec php vendor/bin/drush user:login

# Exporter la config après modifications dans l'interface
docker compose exec php vendor/bin/drush config:export --yes

# Activer un nouveau module
docker compose exec php composer require drupal/<module>
docker compose exec php vendor/bin/drush pm:enable --yes <module>
docker compose exec php vendor/bin/drush cache:rebuild
```

## 📁 Structure du projet

```
├── composer.json            # Dépendances Drupal (60+ modules contrib)
├── config/sync/             # Export de la configuration Drupal (YAML)
├── deploy/                  # Stack Docker Compose
│   ├── docker-compose.yml
│   ├── db/                  # Config MariaDB
│   ├── nginx/               # Config Nginx
│   └── php/                 # Dockerfile + php.ini
└── web/
    ├── modules/custom/
    │   └── ipsosenso_menu/  # Fonction Twig ipsosenso_menu() pour les SDC
    └── themes/custom/
        └── ipsosenso/       # Thème custom (base : Mercury / Canvas)
            ├── components/  # 11 composants SDC
            ├── assets/      # Images, SVG, vidéo
            ├── src/         # theme.css (design tokens)
            └── lib/         # detect-editor.js
```

### Composants SDC (`web/themes/custom/ipsosenso/components/`)

| Composant | Description |
|:----------|:------------|
| `navbar` | Navigation principale fixée en haut, alimentée par un menu Drupal |
| `hero-carousel` | Hero plein écran avec carrousel de slides autoplay |
| `hero-slide` | Slide individuelle pour le hero carousel |
| `strate` | Conteneur de section avec fond et layout flexibles |
| `section-title` | Titre de section avec sous-titre optionnel |
| `expertise-card` | Carte de présentation d'une expertise |
| `stat` | Mise en valeur d'un chiffre clé |
| `two-values` | Bloc de comparaison en deux colonnes |
| `client-logo` | Logo client avec lien optionnel |
| `client-logo-grid` | Grille de logos clients |
| `footer` | Pied de page avec menus, adresse et réseaux sociaux |

## 📚 Documentation

* [Drupal CMS User Guide](https://project.pages.drupalcode.org/drupal_cms/)
* [Drupal User Guide](https://www.drupal.org/docs/user_guide/en/index.html)
* [Single Directory Components (SDC)](https://www.drupal.org/docs/develop/theming-drupal/using-single-directory-components)
* [Canvas module](https://www.drupal.org/project/canvas)
* [Mercury theme](https://www.drupal.org/project/mercury)

## 📅 Roadmap

| Fonctionnalité | Description | Statut |
|:---------------|:------------|:-------|
| **Thème IpsoSenso** | Déclinaison Mercury avec identité visuelle IpsoSenso | ✅ Fait |
| **Composants SDC** | 11 composants Canvas (navbar, hero, footer, stat…) | ✅ Fait |
| **Module ipsosenso_menu** | Fonction Twig pour rendre des menus Drupal dans les SDC | ✅ Fait |
| **Stack Docker** | Docker Compose MariaDB + PHP-FPM + Nginx | ✅ Fait |
| **Suite AI** | Intégration drupal/ai avec providers Anthropic & OpenAI | ✅ Fait |
| **Tests** | Tests fonctionnels et unitaires | ⏳ À faire |
| **CI/CD** | Pipeline GitHub Actions (lint, deploy) | ⏳ À faire |
| **Multilingue** | Configuration canvas_multilingual | ⏳ À faire |

## 📄 Licence

Ce projet est sous licence [GNU General Public License v2.0 ou ultérieure](http://www.gnu.org/licenses/old-licenses/gpl-2.0.html).

Drupal et son logo sont des marques déposées. Voir la [politique des marques Drupal](https://www.drupal.com/trademark).

# Sky Airlines API

API permettant la recherche, la réservation et la gestion de billets d’avion, basée sur Node.js, Express, Sequelize et Amadeus.

---

## 🚀 Fonctionnalités

- Authentification JWT (login, register, refresh token)
- Création d’une réservation (Booking)
- Gestion des passagers
- Paiement d’une commande
- Génération de tickets
- Sauvegarde du `flightOfferSnapshot`
- Webhooks de paiement (optionnel)

---

## 🗂️ Structure du projet

src/
├── constants/
├── controllers/
├── dtos/
├── @types/
├── services/
├── models/
├── routes/
├── types/
├── jobs/
├── factories/
├── handlers/
├── scripts/
├── middlewares/
├── config/
└── utils/

---

## 🔧 Technologies

- Node.js / Express  / TypeScript
- Sequelize (PostgreSQL)  
- JWT  
- Amadeus Flight Offers API  
- Zod (validation)

---

## 📌 Endpoints

### 🔐 Auth

| Méthode | Endpoint | Description |
|--------|----------|-------------|
| POST | `/auth/register` | Créer un utilisateur |
| POST | `/auth/login` | Se connecter |
| POST | `/auth/refresh` | Rafraîchir le token |

### ✈️ Flights

| Méthode | Endpoint | Description |
|--------|----------|-------------|
| GET | `/flights/search` | Rechercher des vols |

### 🛒 Bookings

| Méthode | Endpoint | Description |
|--------|----------|-------------|
| POST | `/bookings` | Créer une réservation |
| GET | `/bookings/:id` | Détails d’une réservation |
| POST | `/bookings/:id/confirm` | Confirmer la réservation |

### 🧍 Passengers

| Méthode | Endpoint | Description |
|--------|----------|-------------|
| POST | `/bookings/:id/passengers` | Ajouter un passager |
| DELETE | `/bookings/:id/passengers/:pid` | Supprimer un passager |

### 💳 Payment

| Méthode | Endpoint | Description |
|--------|----------|-------------|
| POST | `/bookings/:id/pay` | Initier un paiement |

### 🎫 Tickets

| Méthode | Endpoint | Description |
|--------|----------|-------------|
| GET | `/tickets/:id` | Récupérer un ticket |
| GET | `/users/:id/tickets` | Tickets d’un utilisateur |

## Installation

git clone <https://github.com/ton-repo/sky-airlines-api.git>
cd sky-airlines-api
pnpm install
pnpm run dev

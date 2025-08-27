# @nestvue/frontend

A modern Vue 3 frontend for the NestVue Blog App. Built with the Composition API, TypeScript, TailwindCSS, and PrimeVue components. The focus is a clean and minimal reading experience.

## What’s included (MVP)

- Home page that lists recent articles in a two-column layout
- Article cards showing title, published date, and short description
- Simple lazy loading with a Load more button on list pages
- Article detail page routed by id at `/articles/:id`
- PrimeVue is configured globally with a modern theme
- Navigation bar with links to Home and Articles
- Composition API composables for fetching articles
- Type-safe components and views using Vue + TypeScript

## Structure

```
src/
├── components/
│   ├── ArticleCard.vue           # Reusable card
│   └── FilterButtons.vue         # Simple filter chips (visual only for now)
├── composables/
│   └── useArticles.ts            # Fetch and manage article state
├── services/
│   └── api.ts                    # API service wrapper
├── views/
│   ├── HomeView.vue              # Article list with Load more
│   ├── ArticlesView.vue          # Dedicated list view with Load more
│   └── ArticleDetailView.vue     # Article content by id
├── router/
│   └── index.ts                  # Routes including /articles/:id
├── App.vue                       # Layout shell and navbar
└── main.ts                       # App and PrimeVue setup
```

## Development

Install dependencies at the repository root and run the frontend workspace:

```bash
npm install
npm run dev:frontend
```

The app will be available at `http://localhost:5173`.

## Styling and UI

- TailwindCSS provides the base layout and spacing
- PrimeVue supplies essential UI elements; the global theme is already configured
- The design uses a dark background with accessible contrast and minimalist accents

## Notes

- The article lists currently use client-side lazy loading for simplicity
- Backend endpoints used by the MVP:
  - `GET /articles` – list published articles
  - `GET /articles/:id` – article by id
- Filtering options are displayed but not wired to the API yet

## Next steps (when needed)

- Move from client-side lazy loading to server-side pagination
- Implement filtering (category/tag/search) against the backend
- Add authentication and protected authoring flows

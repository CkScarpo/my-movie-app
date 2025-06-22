# 🚗 Teste Front-End – Localiza Labs

Este projeto foi desenvolvido como parte do **desafio técnico de Front-End da Localiza Labs**.

A proposta consiste em construir uma aplicação React que consuma uma API pública, exiba uma listagem e detalhes de itens, utilize uma biblioteca de UI moderna, seja testável e esteja publicada em ambiente cloud.

---

## 📌 Requisitos Atendidos

- [x] Consumo de API pública (**TMDB API**)
- [x] Página de **listagem de filmes populares**
- [x] Página de **detalhes do filme** com elenco e sinopse
- [x] Interface responsiva com **Material UI**
- [x] Gerenciamento global de estado com **Zustand**
- [x] Testes unitários com alta cobertura (**Jest + Testing Library**)
- [x] **Deploy na Vercel**

---

## 🎬 Funcionalidades

- Busca de filmes por palavra-chave
- Scroll infinito na listagem de resultados
- Detalhamento completo com:
  - Título e data de lançamento
  - Enredo
  - Imagem do pôster
  - Lista de atores (com imagem, nome e personagem)
- Fallbacks visuais para imagens ausentes
- Layout adaptável a diferentes resoluções de tela

---

## 🚀 Tecnologias Utilizadas

- React + TypeScript
- React Router v6
- Zustand (estado global)
- Material UI (estilização e tema)
- Axios (HTTP)
- Jest + React Testing Library (testes)
- Vite (dev server e build)
- TMDB API (The Movie Database)

---

## 🧪 Testes Automatizados

- Renderização condicional e dados dinâmicos testados
- Mock completo da store Zustand
- Mock de imagens e IntersectionObserver
- Comandos:

```bash
npm run test         # Roda os testes
npm run test -- --coverage   # Gera relatório de cobertura

📁 Executando Localmente
bash
git [clone](https://github.com/CkScarpo/my-movie-app.git)
cd my-movie-app
npm install
🔑 Crie um arquivo .env com sua API Key da TMDB:
env
VITE_TMDB_API_KEY=sua_chave_aqui
Obtenha uma chave gratuita em: [TMDB](https://www.themoviedb.org/settings/api)

▶️ Inicie o projeto:
bash
npm run dev
Acesse em: http://localhost:5173

🔗 Deploy
Aplicação disponível em produção via Vercel:

🔗 [Movie TMDB](https://my-movie-app-nu.vercel.app/)

📂 Estrutura do Projeto
src/
├── api/                 # Endpoints e chamadas HTTP
├── components/          # MovieCard, SearchBar, Spinner
├── hooks/               # useInfiniteScroll
├── pages/               # HomePage e MovieDetailPage
├── store/               # movieStore (Zustand)
├── utils/               # formatDate, handleApiError
├── assets/              # Imagens fallback
├── styles/              # Estilos do MUI com SX

📘 API Utilizada
The Movie Database (TMDB)

GET /search/movie → Busca de filmes

GET /movie/:id → Detalhes com elenco

Documentação oficial: https://developer.themoviedb.org/reference/intro/getting-started

👨‍💻 Autor
Desenvolvido por Luiz Eduardo Silva.

🔗 [LinkedIn – Luiz Eduardo Silva](https://www.linkedin.com/in/luiz-eduardo-silva-ti/)

Caso tenha dúvidas ou sugestões, sinta-se à vontade para abrir uma issue ou pull request!
```

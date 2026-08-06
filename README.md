# Peter.mp4 — Portfólio Interativo

Site single-page de portfólio animado para o editor de vídeo e motion designer
**Peter.mp4**. Construído com HTML5, CSS3 e JavaScript puro — sem framework,
sem backend, sem dependências.

## Rodar localmente

Execute o script PowerShell que já vem no projeto:

```powershell
# Pelo PowerShell (Windows)
powershell -ExecutionPolicy Bypass -File iniciar-servidor.ps1
```

Ele abre automaticamente no navegador em `http://localhost:3000`.

Outras opções:

```bash
# Python 3
python -m http.server 3000

# Node (se tiver npx)
npx serve .

# VS Code
# Clique direito no index.html -> "Open with Live Server"
```

## Estrutura de arquivos

```
index.html              Toda a estrutura HTML (hero, portfolio, about, contact, modal)
css/
  reset.css             Reset CSS mínimo
  variables.css         Paleta de cores, fontes, espaçamento, easing
  layout.css            Layout das seções + filtros de categoria
  animations.css        Cursor, scroll-reveal, parallax, halftone, glitch, partículas
  components.css        Botões, nav dots, stickers, sticky notes, cards, modal, IM window, toasts
  responsive.css        Breakpoints mobile/tablet
js/
  bundle.js             ⭐ Código completo do site (tudo num arquivo só)
  data.js               Dados dos projetos (referência — o bundle.js tem a versão final)
```

## Como adicionar um novo projeto

Abra `js/bundle.js` e encontre o array `projects`. Copie um dos objetos
e preencha:

```js
{
  id: "meu-novo-video",              // slug único
  title: "Nome do Projeto",
  thumbnail: "",                      // "" = usa thumbnail do YouTube automaticamente
  youtube: "https://youtu.be/XXXXXXXXXXX",
  description: "Descrição curta do projeto.",
  software: ["Adobe Premiere Pro", "Adobe After Effects"],
  style: "Estilo de edição",
  role: "Editor & Motion Designer",
  accent: "cyan",                     // red | yellow | pink | cyan | green | purple
  categories: ["roblox"],             // ids das categorias onde aparece
},
```

## Como adicionar uma nova categoria ("pasta")

No array `categories` em `js/bundle.js`, adicione:

```js
{ id: "anime", label: "Anime Edits", color: "green" },
```

Depois adicione `"anime"` no campo `categories` dos projetos que pertencem a essa pasta.

## Funcionalidades interativas

- **Sistema de filtros**: Abas clicáveis (All, Selected Work, Roblox, Long Form)
  filtram os vídeos do portfólio dinamicamente.
- **Vídeo inline**: Ao clicar num card, o vídeo do YouTube roda direto no site,
  sem redirecionar para o YouTube.
- **Cursor pixel**: Cursor customizado retro com anel que segue o mouse.
- **Scroll-reveal**: Animações de aparecimento (pop, slide, stagger) ao rolar,
  via `IntersectionObserver`.
- **Parallax**: Formas flutuantes, grids e texturas em movimento nos backgrounds.
- **Contato IM**: Seção estilizada como janela de messenger retro com bolhas animadas
  e toasts de notificação ao entrar na seção.
- **Easter egg**: Konami Code (↑ ↑ ↓ ↓ ← → ← → B A) ou 5 cliques rápidos
  no título do hero para ativar uma overlay secreta.
- **Teclado**: Seta ↑/↓ navega entre seções.
- **Idiomas**: Botão EN/PT alterna inglês e português.
- **Respeita `prefers-reduced-motion`**: Desativa animações para acessibilidade.

## Editando cores e fontes

Todos os tokens de design estão em `css/variables.css` (paleta, fontes,
espaçamento, curvas de easing, sombras).

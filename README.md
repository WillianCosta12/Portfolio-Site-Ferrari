# Ferrari — Redesign Conceitual (Non Ufficiale)

Peça de portfólio: uma landing de página única, cinematográfica, no DNA de
sites premiados (Awwwards/FWA) como o do Lando Norris, a página do Mac Mini
e o site do GTA VI — contando a história real da Ferrari na Fórmula 1 em
8 cenas.

**Direção criativa:** uma cerimônia de ignição — do silêncio ao vermelho
absoluto, contando a velocidade como herança italiana. Paleta de 2 cores
(Rosso `#D40000` + quase-preto `#0A0A0A`), um monoposto estilizado em
linha-arte técnica (blueprint) como protagonista visual, tipografia
condensada e imponente.

> ⚠️ **Conceito não-oficial.** Este projeto não é afiliado, endossado ou
> associado à Scuderia Ferrari, à Ferrari S.p.A. ou à Formula 1. Nenhum
> logotipo, fonte ou ativo oficial foi utilizado — toda a identidade visual
> (paleta, tipografia e ilustração do carro) é original, criada para esta
> peça de portfólio.

## Rodando o projeto

```bash
npm install
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000).

```bash
npm run build   # build de produção
npm run start   # roda o build de produção
npm run lint    # eslint
```

## Stack

- **Next.js 15** (App Router) + **TypeScript** + **Tailwind CSS v4**
- **GSAP + ScrollTrigger** — coreografia de scroll (pin, scrub, timelines)
- **Lenis** — smooth scroll
- **SplitType** — kinetic typography

Sem 3D/WebGL: o protagonista visual é uma silhueta SVG original em
linguagem de desenho técnico, animada via `stroke-dashoffset` e
`fill-opacity` — mais leve que um asset 3D e sem depender de modelos de
terceiros.

## Estrutura — 8 cenas

| Cena | Componente | Pin? | O que faz |
|---|---|---|---|
| 1. Ignição | `IgnitionScene.tsx` | não | Hero com kinetic typography, toca na carga da página |
| 2. O Monoposto | `MonopostoScene.tsx` | sim | O carro se desenha (blueprint) e ganha cor |
| 3. Herança | `HeritageScene.tsx` | sim | Trilha horizontal com 8 marcos reais da Ferrari na F1 (1947–hoje) |
| 4. Leggende | `LegendsScene.tsx` | não | Grid com 6 pilotos históricos (Ascari, Lauda, Villeneuve, Schumacher, Leclerc...) |
| 5. Icone | `IconsScene.tsx` | não | Galeria de 6 modelos icônicos (125 S, 250 GTO, F40, F50, Enzo, LaFerrari) |
| 6. A Máquina | `MachineScene.tsx` | não | 6 specs técnicas com reveal por clip-path + contadores |
| 7. Numeri | `NumbersScene.tsx` | não | 3 recordes históricos reais em contadores gigantes |
| 8. Clímax — A Pista | `ClimaxScene.tsx` | sim | O vermelho toma a tela; selo final "FORZA FERRARI" |

Cenas pinned e não-pinned se alternam de propósito — é o princípio de
"ritmo": nem tudo precisa travar o scroll, só os momentos de maior impacto.

Todos os fatos, nomes e anos citados (pilotos, carros, títulos) são
históricos e de domínio público, usados de forma editorial — não há
alegação de dados oficiais/proprietários da equipe.

Componentes de suporte:

- `src/components/SmoothScroll.tsx` — inicializa Lenis + GSAP ticker (client-only)
- `src/components/ScrollChrome.tsx` — monograma fixo + linha de progresso
- `src/components/KineticText.tsx` — wrapper reutilizável de SplitType + GSAP
- `src/components/BlueprintCar.tsx` — a silhueta SVG original do monoposto
- `src/hooks/usePrefersReducedMotion.ts` — gate de acessibilidade
- `src/hooks/useRevealOnScroll.ts` — hook compartilhado de reveal por clip-path (Leggende/Icone)

## Fotografia

As texturas fotográficas (`public/images/`) são todas de licença livre
(Unsplash License) e sem marca/logotipo visível: asfalto molhado, colinas
da Toscana, fibra de carbono, fumaça de pneu, bandeira quadriculada e curva
de pista. Todas recebem um tratamento de duotone (`.photo-duotone` +
`.photo-duotone-overlay` em `globals.css`) pra não introduzir cores fora da
paleta de 2 cores do site.

## Tokens de design

Cor, tipografia, easing e duração vivem como CSS variables em
`src/app/globals.css` (`--rosso`, `--nero`, `--avorio`, `--ease-out-expo`,
etc.) e são expostos ao Tailwind via `@theme inline` — use `bg-rosso`,
`text-avorio`, `font-display` etc. em vez de valores soltos.

## Performance & acessibilidade

- Animações usam apenas `transform`/`opacity` (e `clip-path`, que é
  compositável) — nunca `top`/`left`/`width`.
- `prefers-reduced-motion` é respeitado em cada cena: sem Lenis, sem
  split de texto, sem pin — o conteúdo aparece direto no estado final.
- Sem assets pesados (3D/vídeo) para carregar — o hero é texto, o "3D" é
  SVG vetorial.
- `will-change` aplicado com parcimônia só no elemento de scroll horizontal
  mais pesado (Cena 3).

## Onde ajustar a direção

- **Cores/tipografia:** `src/app/globals.css` (bloco `:root` e `@theme inline`)
- **Copy do storytelling:** dentro de cada arquivo em `src/components/scenes/`
- **A silhueta do carro:** `src/components/BlueprintCar.tsx` (paths SVG)
- **Duração/intensidade das animações:** os `gsap.timeline()` dentro de
  cada cena — os números em `end: "+=XXXX"` controlam quanto scroll cada
  cena "dura"

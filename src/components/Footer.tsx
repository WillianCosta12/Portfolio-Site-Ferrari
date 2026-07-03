export default function Footer() {
  return (
    <footer className="border-t border-avorio/10 bg-nero px-6 py-16">
      <div className="mx-auto flex max-w-6xl flex-col gap-10 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <span className="font-display text-2xl tracking-wide text-avorio">
            FERRARI
          </span>
          <p className="mt-2 max-w-xs font-body text-sm text-avorio/50">
            Redesign conceitual não-oficial. Um estudo de direção visual e
            motion. Velocità è eredità.
          </p>
        </div>

        <div className="flex flex-col gap-1 font-body text-sm text-avorio/50 sm:text-right">
          <span>Peça de portfólio</span>
          <span>Direção, design e código — projeto autoral independente</span>
        </div>
      </div>

      <p className="mx-auto mt-12 max-w-6xl border-t border-avorio/10 pt-6 font-body text-xs text-avorio/35">
        Este site é um <strong className="text-avorio/50">redesign conceitual não-oficial</strong>,
        criado exclusivamente para fins de estudo e portfólio. Não possui
        qualquer afiliação, endosso ou associação com a Ferrari S.p.A., a
        Scuderia Ferrari ou a Formula 1 — não se trata de um produto oficial
        da marca. Nenhum logotipo, wordmark, fonte ou fotografia de imprensa
        oficial foi utilizado: toda a identidade visual (paleta, tipografia e
        ilustração do monoposto) é original. As fotografias de textura são de
        bancos de imagem de licença livre (Unsplash). Valores técnicos
        exibidos são ilustrativos e não representam dados oficiais.
      </p>
    </footer>
  );
}

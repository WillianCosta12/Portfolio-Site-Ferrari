type BlueprintCarProps = {
  className?: string;
};

/**
 * Silhueta original e estilizada de um monoposto de corrida, em linguagem de
 * desenho técnico (blueprint). Não representa nenhum carro real — é uma
 * abstração geométrica própria, pensada para se "desenhar" e depois ganhar
 * cor no scroll.
 */
export default function BlueprintCar({ className = "" }: BlueprintCarProps) {
  return (
    <svg
      viewBox="0 0 1000 320"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g strokeLinecap="round" strokeLinejoin="round">
        {/* Asa dianteira + winglets das endplates */}
        <path
          className="bp-shape"
          pathLength={1}
          d="M20,225 L190,225 L190,235 L20,235 Z M20,208 L20,252 M190,200 L190,260"
        />
        <path
          className="bp-shape"
          pathLength={1}
          d="M14,214 L26,204 M14,246 L26,256 M184,196 L197,188 M184,264 L197,271"
        />
        {/* Focinho / monocoque */}
        <path
          className="bp-shape"
          pathLength={1}
          d="M190,230 C260,230 300,206 355,200 L355,222 C300,220 258,232 190,236 Z"
        />
        {/* Halo + pilar central */}
        <path
          className="bp-shape"
          pathLength={1}
          d="M400,200 C400,148 462,148 462,200 M431,152 L431,198"
        />
        <ellipse
          className="bp-shape"
          pathLength={1}
          cx="430"
          cy="205"
          rx="26"
          ry="10"
        />
        {/* Bargeboard / defletor antes do sidepod */}
        <path
          className="bp-shape"
          pathLength={1}
          d="M470,206 L470,234 L490,231 L490,211 Z"
        />
        {/* Sidepod / cobertura do motor */}
        <path
          className="bp-shape"
          pathLength={1}
          d="M462,200 C560,190 660,196 745,214 L745,236 C660,224 566,222 462,224 Z"
        />
        {/* Asa traseira: elemento principal + flap DRS + suportes */}
        <path
          className="bp-shape"
          pathLength={1}
          d="M870,132 L955,132 L955,144 L870,144 Z M878,118 L958,114 L958,122 L878,126 Z M870,116 L870,160 M955,110 L955,166 M900,204 L905,144 M935,204 L940,144"
        />
        {/* Fundo plano + difusor com strakes */}
        <path
          className="bp-shape"
          pathLength={1}
          d="M300,242 L790,242 L790,252 L748,258 L330,256 Z M700,242 L700,257 M725,242 L725,259 M750,242 L750,257"
        />
        {/* Roda dianteira: pneu, cubo e disco de freio */}
        <circle className="bp-shape" pathLength={1} cx="150" cy="228" r="42" />
        <path
          className="bp-shape"
          pathLength={1}
          d="M150,228 L150,190 M150,228 L188,228 M150,228 L150,266 M150,228 L112,228"
        />
        <circle className="bp-shape" pathLength={1} cx="150" cy="228" r="14" />
        {/* Roda traseira: pneu, cubo e disco de freio */}
        <circle className="bp-shape" pathLength={1} cx="845" cy="228" r="48" />
        <path
          className="bp-shape"
          pathLength={1}
          d="M845,228 L845,184 M845,228 L889,228 M845,228 L845,272 M845,228 L801,228"
        />
        <circle className="bp-shape" pathLength={1} cx="845" cy="228" r="17" />
      </g>
    </svg>
  );
}

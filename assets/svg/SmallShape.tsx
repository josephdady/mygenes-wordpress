export default function SmallShape(props: any) {
  const { color1, color2 } = props;
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="223.835" height="341.62">
      <defs>
        <linearGradient
          id="a"
          x1=".5"
          x2=".5"
          y2="1"
          gradientUnits="objectBoundingBox"
        >
          <stop offset="0" stopColor="#a0d911" />
          <stop offset="1" stopColor="#8cbe10" />
        </linearGradient>
        <clipPath id="b">
          <path
            fill="url(#a)"
            d="M772.258 670.461c-11.089 16.63-19.57 32.56-24.52 46.94-33.62 97.65 108.181 86.7 178.41 110.89 11.37 3.91 25.13 6.21 40.35 6.88v-341.62c-67.87 36.111-150.95 111.9-194.24 176.91"
            data-name="Path 114618"
          />
        </clipPath>
      </defs>
      <g data-name="Group 106481">
        <g
          clipPath="url(#b)"
          data-name="Group 106480"
          transform="translate(-742.663 -493.551)"
        >
          <path
            fill="url(#a)"
            d="M0 0h252.38v341.62H0z"
            data-name="Rectangle 25672"
            transform="translate(714.118 493.551)"
          />
        </g>
      </g>
    </svg>
  );
}

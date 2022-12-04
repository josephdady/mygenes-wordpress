export default function BigShape(props: any) {
  const { color1, color2 } = props;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="966.498"
      height="805.312"
      data-name="Group 106479"
    >
      <defs>
        <linearGradient
          id="c"
          x1=".5"
          x2=".5"
          y2="1"
          gradientUnits="objectBoundingBox"
        >
          <stop offset="0" stopColor="#ff7d51" />
          <stop offset="1" stopColor="#fa541c" />
        </linearGradient>
        <clipPath id="d">
          <path
            fill="url(#c)"
            d="M608.377 0C395.605.145.207 302.652 0 593.609v.361q0 5.253.178 10.5c23.361 389.9 486.82 97.64 772.08 65.99 71.091-7.89 131.1.4 170.49 39.46a298.122 298.122 0 0 0 23.75 21.14v-550.2c-112.65-28.04-205.35-69.94-250.38-133.74C693.192 14.64 655.349.038 608.7 0Z"
            data-name="Path 114617"
          />
        </clipPath>
      </defs>
      <g clipPath="url(#d)" data-name="Group 106478">
        <path
          fill="url(#c)"
          d="M0 0h966.498v994.371H0z"
          data-name="Rectangle 25671"
        />
      </g>
    </svg>
  );
}

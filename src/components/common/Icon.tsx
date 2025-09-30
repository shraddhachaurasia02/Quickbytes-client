function Icon(props: { className?: string; color?: string }) {
  const strokeColor = props.color || "#000"; // default black

  return (
    <svg
      className={props.className}
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      fill="none"
      viewBox="0 0 32 32"
    >
      <path
        stroke={strokeColor}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="4"
        d="M9.1 12.641a7.8 7.8 0 01-.7-3.1 7.4 7.4 0 0114.7 0 8.198 8.198 0 01-.7 3.1"
      ></path>
      <path
        stroke={strokeColor}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="4"
        d="M8 21.141a7.3 7.3 0 01-6-7.2c0-4 2.7-6.5 6.7-6.5M22.7 7.441c4.1 0 6.8 2.5 6.8 6.5a7.3 7.3 0 01-6 7.2M8 21.141v7.6h15.4v-7.6M8 24.941h15.4M15.7 24.941v-4"
      ></path>
    </svg>
  );
}

export default Icon;


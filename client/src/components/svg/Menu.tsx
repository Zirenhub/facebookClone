interface Props {
  fill?: string;
}

function Menu({ fill }: Props) {
  return (
    <svg
      width="28px"
      height="28px"
      viewBox="0 0 24 24"
      fill={fill}
      className="block m-auto"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4 7H20M4 12H20M4 17H20"
        stroke={fill}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

Menu.defaultProps = {
  fill: '#65676b',
};

export default Menu;

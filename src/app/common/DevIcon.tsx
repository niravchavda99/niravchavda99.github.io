type IconProps = {
  className: string
}

const DevIcon = ({className}: IconProps) => {
  return <i className={`${className}`}></i>;
};

export default DevIcon;
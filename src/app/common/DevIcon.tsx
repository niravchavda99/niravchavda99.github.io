type IconProps = {
  className: string;
  size?: number;
};

const DevIcon = ({ className, size }: IconProps) => {
  return (
    <i style={{ fontSize: `${size ?? 3}rem` }} className={`${className}`}></i>
  );
};

export default DevIcon;

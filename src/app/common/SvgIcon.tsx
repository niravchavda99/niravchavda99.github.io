type SvgIconProps = {
  svg: string;
};

const SvgIcon = ({ svg }: SvgIconProps) => {
  return <img src={svg} className={"w-16 inline-block"} alt={"Icon"} />;
};

export default SvgIcon;

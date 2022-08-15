type SvgIconProps = {
  svg: string
}

const SvgIcon = ({svg}: SvgIconProps) => {
  return <img src={svg} className={'w-8 inline-block'} alt={'Icon'}/>;
};

export default SvgIcon;
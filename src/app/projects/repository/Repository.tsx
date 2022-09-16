import './Repository.scss';
import RepositoryDto from "../RepositoryDto";
import {getLanguageIcon} from "../../Utils";
import ThemeValueProps from "../../common/ThemeValueProps";
import {FiGithub} from "react-icons/fi";
import Shiny from "../../common/shiny/Shiny";

type RepositoryProps = ThemeValueProps & { repository: RepositoryDto }

const Repository = ({repository, theme}: RepositoryProps) => {
  const {language} = repository;
  const icon = getLanguageIcon(language, theme);

  return (
      <div className={'repository-wrapper'}>
        <Shiny color={"#7C3AED"} size={150} theme={theme} classNames="repository-container">
          <div className={'h-full flex flex-col justify-between items-center'}>
            <div>
              <div className="repository-name">{repository.name}</div>
              <p className="repository-description">{repository.description}</p>
              <p className="repository-description">
                {language &&
                    <span className="repository-language">
                      {icon} {language}
                    </span>}
              </p>
            </div>
            <a href={repository.htmlUrl} className="code-link" rel={"noreferrer"} target={"_blank"}>
              <FiGithub className={'inline-block'} size={16}/>
              <span className={'ml-1'}>Code</span>
            </a>
          </div>
        </Shiny>
      </div>
  );
};

export default Repository;

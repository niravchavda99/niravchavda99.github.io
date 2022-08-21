import './Repository.scss';
import RepositoryDto from "../RepositoryDto";
import {getLanguageIcon} from "../../Utils";
import ThemeValueProps from "../../common/ThemeValueProps";
import {FiGithub} from "react-icons/fi";

type RepositoryProps = ThemeValueProps & { repository: RepositoryDto }

const Repository = ({repository, theme}: RepositoryProps) => {
  const {language} = repository;
  const icon = getLanguageIcon(language, theme);

  return (
      <div className={'repository-wrapper'}>
        <div className="repository-container">
          <div className={'h-full flex flex-col justify-between items-center'}>
            <div>
              <div className="repository-name">{repository.name}</div>
              <p className="repository-description">{repository.description}</p>
              <p className="repository-description">
                {language &&
                    <div className="repository-language">
                      {icon} {language}
                    </div>}
              </p>
            </div>
            <a href={repository.htmlUrl} className="code-link" rel={"noreferrer"} target={"_blank"}>
              <FiGithub className={'inline-block'} size={16}/>
              <span className={'ml-1'}>Code</span>
            </a>
          </div>
        </div>
      </div>
  );
};

export default Repository;
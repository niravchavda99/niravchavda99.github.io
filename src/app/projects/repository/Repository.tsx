import './Repository.scss';
import RepositoryDto from "../RepositoryDto";
import {FiGithub} from "react-icons/fi";
import {getLanguageIcon} from "../../Utils";
import ThemeValueProps from "../../common/ThemeValueProps";

type RepositoryProps = ThemeValueProps & { repository: RepositoryDto }

const Repository = ({repository, theme}: RepositoryProps) => {
  const {language} = repository;
  const icon = getLanguageIcon(language, theme);

  return (
      <div className={'repository-container'}>
        <div>
          <div className="repository-title">{repository.name}</div>
          <div className="repository-description">{repository.description}</div>
          {language &&
              <div className="repository-language">
                {icon} {language}
              </div>}
        </div>
        <a className={"code-link"} href={repository.htmlUrl} rel={"noreferrer"} target={"_blank"}>
          <FiGithub className={'inline-block'} size={16}/>
          <span> Code</span>
        </a>
      </div>
  );
};

export default Repository;
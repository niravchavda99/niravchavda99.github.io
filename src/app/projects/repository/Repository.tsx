import './Repository.scss';
import RepositoryDto from "../RepositoryDto";
import {getLanguageIcon} from "../../Utils";
import {FiGithub} from "react-icons/fi";
import Shiny from "../../common/shiny/Shiny";
import {GlassMorphic} from "../../common/glassmorphic/GlassMorphic";

type RepositoryProps = { repository: RepositoryDto }

const Repository = ({repository}: RepositoryProps) => {
  const {language} = repository;
  const icon = getLanguageIcon(language);

  return (
      <div className={'repository-wrapper'}>
        <GlassMorphic fadeOpacity={20} classNames={'w-full h-full'}>
          <Shiny color={"#7C3AED"} size={200} classNames="repository-container">
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
              <a href={repository.htmlUrl} className="code-link" rel={"noreferrer"}
                 target={"_blank"}>
                <FiGithub className={'inline-block'} size={16}/>
                <span className={'ml-1'}>Code</span>
              </a>
            </div>
          </Shiny>
        </GlassMorphic>
      </div>
  );
};

export default Repository;

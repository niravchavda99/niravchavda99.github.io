import './Repository.scss';
import RepositoryDto from "../RepositoryDto";
import {getLanguageIcon} from "../../Utils";
import Shiny from "../../common/shiny/Shiny";
import {GlassMorphic} from "../../common/glassmorphic/GlassMorphic";
import {RxExternalLink} from "react-icons/rx";
import {FaGithub} from "react-icons/fa";
import {useState} from "react";

type RepositoryProps = { repository: RepositoryDto }

const Repository = ({repository}: RepositoryProps) => {
  const {language} = repository;
  const icon = getLanguageIcon(language);
  const [showCodeLinkButton, toggleShowCodeLinkButton] = useState<boolean>(false);

  return (
      <div className={'repository-wrapper'} onMouseOver={() => toggleShowCodeLinkButton(true)}
           onMouseOut={() => toggleShowCodeLinkButton(false)}>
        <GlassMorphic fadeOpacity={20} classNames={'w-full h-full'}>
          <Shiny color={"#0EA5E9"} size={200} classNames="repository-container">
            <div className={'h-full flex flex-row place-content-between text-left'}>
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

              <div
                  className={`flex flex-col ${showCodeLinkButton ? 'justify-between' : 'justify-end'}`}>
                {showCodeLinkButton &&
                    <a href={repository.htmlUrl} className="code-link" rel={"noreferrer"}
                       target={"_blank"}>
                      <span className={'mr-1 text-lg'}>Code</span>
                      <RxExternalLink className={'inline-block'} size={16}/>
                    </a>}
                <div className={'text-right'}>
                  <FaGithub className={'inline-block text-white'} size={16}/>
                </div>
              </div>
            </div>
          </Shiny>
        </GlassMorphic>
      </div>
  );
};

export default Repository;

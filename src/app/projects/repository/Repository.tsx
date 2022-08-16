import './Repository.scss';
import RepositoryDto from "../RepositoryDto";
import {FiGithub} from "react-icons/fi";

type RepositoryProps = {
  repository: RepositoryDto
}

const Repository = ({repository}: RepositoryProps) => {
  return (
      <div className={'repository-container'}>
        <div>
          <div className="repository-title">{repository.name}</div>
          <div className="repository-description">{repository.description}</div>
        </div>
        <a className={"code-link"} href={repository.htmlUrl} rel={"noreferrer"} target={"_blank"}>
          <FiGithub className={'inline-block'} size={16}/>
          <span> Code</span>
        </a>
      </div>
  );
};

export default Repository;
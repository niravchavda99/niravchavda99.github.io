import './Projects.scss';
import {fetchRepositories} from "../http/GithubGateway";
import {useEffect, useState} from "react";
import RepositoryDto from "./RepositoryDto";
import Repository from "./repository/Repository";
import {InfinitySpin} from "react-loader-spinner";

const Projects = () => {
  const [repositories, setRepositories] = useState<RepositoryDto[]>([]);

  useEffect(() => {
    fetchRepositories().then(repos => setRepositories(repos));
  }, []);

  return (
      <div className={'projects-container'}>
        <div className="projects-header">Projects</div>
        {repositories.length < 1 ?
            <div className={"flex flex-col items-center"}>
              <InfinitySpin width='200' color="#8b5cf6"/>
            </div> :
            <div className="grid grid-cols-3 gap-10">
              {repositories.map(repository => <Repository repository={repository}/>)}
            </div>
        }
      </div>
  );
};

export default Projects;
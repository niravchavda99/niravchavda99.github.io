import './Projects.scss';
import {fetchRepositories} from "../http/GithubGateway";
import {ChangeEvent, useEffect, useState} from "react";
import RepositoryDto from "./RepositoryDto";
import {InfinitySpin} from "react-loader-spinner";
import Search from "../common/search/Search";
import Header from "../header/Header";
import ThemeProps from "../common/ThemeProps";
import Repository from "./repository/Repository";

const filterReposByName = (repositories: RepositoryDto[] | null, subject: string): RepositoryDto[] => {
  if (repositories === null) {
    return [];
  }

  return repositories.filter(repository => repository.name.toLowerCase().includes(subject.toLowerCase()));
}

const Projects = ({theme, toggleTheme}: ThemeProps) => {
  const [allRepositories, setAllRepositories] = useState<RepositoryDto[] | null>(null);
  const [repositories, setRepositories] = useState<RepositoryDto[] | null>(allRepositories);

  useEffect(() => {
    fetchRepositories().then(repos => {
      setAllRepositories(repos);
      setRepositories(repos);
    });
  }, []);

  const setFilteredRepos = (e: ChangeEvent<HTMLInputElement>) => {
    const filteredRepositories = filterReposByName(allRepositories, e.target.value);
    setRepositories(filteredRepositories);
  }

  const loadingSpinnerColor = theme === 'dark' ? "#E2E8F0" : "#8b5cf6";

  return (
      <>
        <Header theme={theme} toggleTheme={toggleTheme}/>
        <div className={'projects-container'}>
          <div className="projects-header">Projects</div>
          {repositories === null ?
              <div className={"infinity-loading-spinner"}>
                <InfinitySpin width='200' color={loadingSpinnerColor}/>
              </div> :
              <div>
                <Search handleChange={setFilteredRepos}/>
                <div className="repositories-container">
                  {repositories.map(repository =>
                      <Repository key={repository.id} repository={repository} theme={theme}/>)}
                </div>
              </div>
          }
        </div>
      </>
  );
};

export default Projects;
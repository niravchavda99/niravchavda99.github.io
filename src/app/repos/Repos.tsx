import './Repos.scss';
import {fetchRepositories} from "../http/GithubGateway";
import {ChangeEvent, useEffect, useState} from "react";
import RepositoryDto from "./RepositoryDto";
import {InfinitySpin} from "react-loader-spinner";
import Search from "../common/search/Search";
import Header from "../header/Header";
import Repository from "./repository/Repository";

const filterReposByName = (repositories: RepositoryDto[] | null, subject: string): RepositoryDto[] => {
  if (repositories === null) {
    return [];
  }

  return repositories.filter(repository => repository.name.toLowerCase().includes(subject.toLowerCase()));
}

const Repos = () => {
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

  const loadingSpinnerColor = "#E2E8F0";

  return (
      <>
        <Header/>
        <div className={'repos-container'}>
          <div className="repos-header">Github Repos</div>
          {repositories === null ?
              <div className={"infinity-loading-spinner"}>
                <InfinitySpin width='200' color={loadingSpinnerColor}/>
              </div> :
              <div>
                <Search handleChange={setFilteredRepos}/>
                <div className="repositories-container">
                  {repositories.map(repository =>
                      <Repository key={repository.id} repository={repository}/>)}
                </div>
              </div>
          }
        </div>
      </>
  );
};

export default Repos;
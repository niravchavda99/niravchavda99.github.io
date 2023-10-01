import axios from "axios";
import RepositoryDto from "../repos/RepositoryDto";

export const fetchRepositories = async (): Promise<RepositoryDto[]> => {
  const {data} = await axios.get('https://api.github.com/users/niravchavda99/repos?per_page=100', {
    headers: {
      'Accept': 'application/vnd.github+json'
    }
  });

  return data.map((d: any) =>
      new RepositoryDto(d.id, d.name, d.html_url, d.description, d.language));
}
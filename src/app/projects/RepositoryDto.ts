class RepositoryDto {
  constructor(
      public id: string,
      public name: string,
      public htmlUrl: string,
      public description: string,
      public createdAt: string,
      public language: string,
      public forks: number
  ) {
  }
}

export default RepositoryDto;
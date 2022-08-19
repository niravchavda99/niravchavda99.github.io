class RepositoryDto {
  constructor(
      public id: string,
      public name: string,
      public htmlUrl: string,
      public description: string,
      public language: string
  ) {
  }
}

export default RepositoryDto;
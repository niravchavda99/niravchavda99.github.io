const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

class MonthYear {
  private constructor(
    public month: number,
    public year: number,
  ) {}

  static of(month: number, year: number): MonthYear {
    return new MonthYear(month, year);
  }

  public get isPresent() {
    return this.month === 0 && this.year === 0;
  }

  public toString(): string {
    if (this.isPresent) {
      return "Present";
    }

    const monthName = months[this.month - 1];
    return `${monthName} ${this.year}`;
  }
}

export default MonthYear;

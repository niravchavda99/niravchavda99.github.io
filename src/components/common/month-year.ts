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

  public static of(month: number, year: number): MonthYear {
    return new MonthYear(month, year);
  }

  public static present(): MonthYear {
    const date = new Date();
    return MonthYear.of(date.getMonth() + 1, date.getFullYear());
  }

  public toString(): string {
    const monthName = months[this.month - 1];
    return `${monthName} ${this.year}`;
  }

  public toCountString(): string {
    const years =
      this.year === 0 ? "" : this.year === 1 ? `1 year` : `${this.year} years`;
    const months = this.month === 1 ? `1 month` : `${this.month} months`;
    if (this.year === 0) {
      return months;
    }
    if (this.month === 0) {
      return years;
    }
    return `${years} ${months}`;
  }

  public diff(that: MonthYear): MonthYear {
    const thisTotal = this.year * 12 + (this.month - 1);
    const thatTotal = that.year * 12 + (that.month - 1);
    const diffMonths = Math.abs(thisTotal - thatTotal);
    const years = Math.floor(diffMonths / 12);
    const months = diffMonths % 12;
    return MonthYear.of(months, years);
  }
}

export default MonthYear;

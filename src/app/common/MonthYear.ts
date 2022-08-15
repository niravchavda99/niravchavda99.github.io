import {getMonthName} from "../Utils";

class MonthYear {
  constructor(public month: number, public year: number) {
  }

  public get isPresent() {
    return this.month === 0 && this.year === 0;
  }

  public toString(): string {
    if (this.isPresent) {
      return 'Present';
    }

    const monthName = getMonthName(this.month);
    return `${monthName} ${this.year}`;
  }
}

export default MonthYear;
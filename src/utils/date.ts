import { DateTime, Duration } from "luxon";

export class DateUtils {
  static getDifferenceWithNow(date: Date) {
    const now = DateTime.now();
    const then = DateTime.fromJSDate(date);

    const diffInYears = now.diff(then, ["years"]);

    return Duration.fromDurationLike(diffInYears).shiftTo("minutes");
  }

  static formateNumberDate(date: number, format: string) {
    const jsDate = new Date(date);

    return this.formatDate(jsDate, format);
  }

  static formatDate(date: Date, format: string) {
    const luxonDate = DateTime.fromJSDate(date);

    return luxonDate.toFormat(format);
  }
}

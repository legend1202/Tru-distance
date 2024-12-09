export function generateMonthList(startDate: string, endDate: string) {
  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];

  // Helper function to parse different types of date formats
  const parseDate = (dateStr: string) => {
    let date;

    // Try parsing 'MM/YYYY' (month/year)
    if (dateStr.match(/^\d{2}\/\d{4}$/)) {
      const [month, year] = dateStr.split('/');
      date = new Date(Number(year), Number(month) - 1, 1); // Month is 0-based
    }
    // Try parsing 'YYYY-MM' (year-month)
    else if (dateStr.match(/^\d{4}-\d{2}$/)) {
      const [year, month] = dateStr.split('-');
      date = new Date(Number(year), Number(month) - 1, 1); // Month is 0-based
    }
    // Try parsing 'YYYY-MM-DD' (full date)
    else if (dateStr.match(/^\d{4}-\d{2}-\d{2}$/)) {
      date = new Date(dateStr);
    }
    // Try parsing ISO 8601 format 'YYYY-MM-DDTHH:mm:ss.sssZ'
    // eslint-disable-next-line no-restricted-globals
    else if (!isNaN(Date.parse(dateStr))) {
      date = new Date(dateStr);
    } else {
      throw new Error(
        "Invalid date format. Supported formats: 'MM/YYYY', 'YYYY-MM', 'YYYY-MM-DD', ISO 8601."
      );
    }

    return date;
  };

  const start = parseDate(startDate);
  const end = parseDate(endDate);

  // Check if date parsing was successful
  // eslint-disable-next-line no-restricted-globals
  if (isNaN(start.getTime()) || isNaN(end.getTime())) {
    throw new Error("Invalid date format. Please use 'MM/YYYY', 'YYYY-MM', or 'YYYY-MM-DD'.");
  }

  const monthList: string[] = [];
  const currentDate = new Date(start);

  while (currentDate <= end) {
    monthList.push(`${months[currentDate.getMonth()]}/${currentDate.getFullYear()}`);
    currentDate.setMonth(currentDate.getMonth() + 1); // Move to next month
  }

  return monthList;
}

export function generateMonthListFromDates(
  startDate: string,
  endDate: string,
  basicStartDate?: string,
  basicEndDate?: string
) {
  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];

  // Helper function to parse different types of date formats
  const parseDate = (dateStr: string) => {
    let date;

    // Try parsing 'MM/YYYY' (month/year)
    if (dateStr.match(/^\d{2}\/\d{4}$/)) {
      const [month, year] = dateStr.split('/');
      date = new Date(Number(year), Number(month) - 1, 1); // Month is 0-based
    }
    // Try parsing 'YYYY-MM' (year-month)
    else if (dateStr.match(/^\d{4}-\d{2}$/)) {
      const [year, month] = dateStr.split('-');
      date = new Date(Number(year), Number(month) - 1, 1); // Month is 0-based
    }
    // Try parsing 'YYYY-MM-DD' (full date)
    else if (dateStr.match(/^\d{4}-\d{2}-\d{2}$/)) {
      date = new Date(dateStr);
    }
    // Try parsing ISO 8601 format 'YYYY-MM-DDTHH:mm:ss.sssZ'
    // eslint-disable-next-line no-restricted-globals
    else if (!isNaN(Date.parse(dateStr))) {
      date = new Date(dateStr);
    } else {
      throw new Error(
        "Invalid date format. Supported formats: 'MM/YYYY', 'YYYY-MM', 'YYYY-MM-DD', ISO 8601."
      );
    }

    return date;
  };

  let start = parseDate(startDate);
  let end = parseDate(endDate);
  const basicStart = basicStartDate ? parseDate(basicStartDate) : new Date();
  const basicEnd = basicEndDate ? parseDate(basicEndDate) : new Date();

  start = start < basicStart ? basicStart : start;

  end = end > basicEnd ? basicEnd : end;

  // Check if date parsing was successful
  // eslint-disable-next-line no-restricted-globals
  if (isNaN(start.getTime()) || isNaN(end.getTime())) {
    throw new Error("Invalid date format. Please use 'MM/YYYY', 'YYYY-MM', or 'YYYY-MM-DD'.");
  }

  const monthList: string[] = [];
  const currentDate = new Date(start);

  while (currentDate <= end) {
    monthList.push(`${months[currentDate.getMonth()]}/${currentDate.getFullYear()}`);
    currentDate.setMonth(currentDate.getMonth() + 1); // Move to next month
  }

  return monthList;
}

export type promptInterface = {
  date: daysAvailableType;
  prompt: string;
  year: yearsAvailableType;
  isFree: boolean;
  link: string;
};

export const yearsAvailable = [
  2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024,
] as const;
export type yearsAvailableType = (typeof yearsAvailable)[number];

// I'd love use Array.from({ length: 31 }, (_, i) => i + 1), but it won't allow that to be a const.
export const daysAvailable = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22,
  23, 24, 25, 26, 27, 28, 29, 30, 31,
] as const;
export type daysAvailableType = (typeof daysAvailable)[number];

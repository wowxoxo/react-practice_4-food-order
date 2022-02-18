export const isEmpty = (value) => value.trim() === "";

export const isEmail = (value) => value.includes("@");

export const isSixChars = (value) => value.trim().length === 6;

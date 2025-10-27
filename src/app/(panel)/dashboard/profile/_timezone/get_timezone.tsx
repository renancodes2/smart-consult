

const timezones = [
  "America/Sao_Paulo",
  "America/Curitiba",
  "America/Porto_Velho",
  "America/Maceio",
  "America/Araguaina",
  "America/Recife",
  "America/Bahia",
  "America/Natal"
];

export const timezone = Intl.supportedValuesOf("timeZone").filter((zone) => 
  timezones.some(t => zone.startsWith(t))
);

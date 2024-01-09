type EmailDomainPart = `${"com" | "net" | "org" | "edu"}`;

type Email<T extends string = EmailDomainPart> = `${string}@${string}.${T}`;

const email_1: Email = "husny@gmail.com";
const email_2: Email<"lk"> = "husny@gmail.lk";

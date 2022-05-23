interface IConstants {
  ApiUrl: string;
}

const Dev: IConstants = {
  ApiUrl: "http://localhost:3000",
};

const Prod: IConstants = {
  ApiUrl: "https://folderly-messenger-api-2eq26fjfka-uc.a.run.app",
};

export const Constants: IConstants =
  process.env.NODE_ENV === "production" ? Prod : Dev;

interface IConstants {
  ApiUrl: string;
}

const Dev: IConstants = {
  ApiUrl: "http://localhost:3000",
};

const Prod: IConstants = {
  ApiUrl: "https://messenger-api.folderly.live",
};

export const Constants: IConstants =
  process.env.NODE_ENV === "production" ? Prod : Dev;

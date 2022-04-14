import axios from "axios";
import numeral from "numeral";
import Cookies from "js-cookie";

let shortText = /[^\n]{2,}/;
let number = /^[0-9]{1,}$/;


export const validate = (field, Regex) => {
  if (patterns[Regex].test(field)) return true;
  return false;
};

export const validateInput = (event) =>
  validate(event.target.value, event.target.attributes.name.value);

export const randomInt = (length) => Math.floor(Math.random() * (length - 1));

export const get_rand = (array) => {
  array.sort(() => 0.5 - Math.random());
  return array;
};

const baseurl = "https://seerbitapi.com";
// const baseurl = "https://stg-backend.cgseerapps.com"

export const axiosInstance = axios.create({
  baseURL: `${baseurl}/checkout/middleware/merchants/api/v1/store/checkout`,
  // withCredentials: true,
  headers: {

    Authorization: `Bearer 68826aea9005de7812429b7983838b06e2c7fffbb3d9487f33bc51c943a3a499`,
  },
});



export const toBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });


if (numeral.locale() !== "na") {
  numeral.register("locale", "na", {
    delimiters: {
      thousands: ",",
      decimal: ".",
    },
    abbreviations: {
      thousand: "K",
      million: "M",
      billion: "B",
      trillion: "T",
    },
    ordinal: function(number) {
      return number === 1 ? "er" : "ème";
    },
    currency: {
      symbol: "N",
    },
  });
}

numeral.locale("na");

function isFloat(n) {
  return Number(n) === n && n % 1 !== 0;
}

export const addsign = (value) => {
  if (Number(value) < 100000) {
    return isFloat(value)
      ? numeral(value).format("0,00.00")
      : numeral(value).format("0,00");
  } else return numeral(value).format("0.00a");
};


export const errorhandler = (toast, err) => {
  let msg;

  err?.response?.status === 500
    ? (msg = "An error occured")
    : (msg = err?.response?.data?.error || "Network Error please try again");

  toast(msg, {
    appearance: "error",
    autoDismiss: true,
  });
};

export const actualPrice = (price, discount) =>
  Number(discount) ? price - (price * discount) / 100 : price;

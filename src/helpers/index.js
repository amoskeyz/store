import axios from "axios";
import numeral from "numeral";
import Cookies from "js-cookie";

let shortText = /[^\n]{2,}/;
let number = /^[0-9]{1,}$/;

const patterns = {
  fullName: /^([a-zA-Z]{2,}\s[a-zA-Z]{1,}'?-?[a-zA-Z]{2,}\s?([a-zA-Z]{1,})?)/,
  email: /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:]|])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:)+)\])/,
  password: /[^\n]{8,}/,
  cpassword: /[^\n]{8,}/,
  phoneNumber: /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s./0-9]*$/,
  profilePic: /^/,
  location: /^/,
  title: shortText,
  name: shortText,
  option: shortText,
  description: shortText,
  category: shortText,
  subCategory: shortText,
  type: shortText,
  review: shortText,
  quantity: number,
  cost: number,
  discount: number,
  rating: /(\d+(?:\.\d+)?)/,
  featured: shortText,
};

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

const baseurl = "https://stg-backend.cgseerapps.com";
// process.env.NODE_ENV === 'development'
//   ? 'http://localhost:4000'
//   : 'https://ayodelejaynelagos.com';

export const axiosInstance = axios.create({
  baseURL: `${baseurl}/api/v2/middleware/merchants/api/v1/store/checkout`,
  // withCredentials: true,
  headers: {
    // 'Access-Control-Allow-Headers':
    //   'Access-Control-Allow-Origin, Access-Control-Allow-Headers, Content-Type',
    // 'Access-Control-Allow-Origin': '*',
    Authorization: `Bearer 68826aea9005de7812429b7983838b06e2c7fffbb3d9487f33bc51c943a3a499`,
  },
});

export const getTitle = (searchFilters) => {
  let query = "";

  const {
    rooms,
    bathrooms,
    category,
    saleType,
    type,
    location,
  } = searchFilters;

  query += rooms ? `${rooms} bedroom` : "";
  query += bathrooms ? `, ${bathrooms} bathroom` : "";

  query += category
    ? category === "land"
      ? " Landed properties"
      : type
      ? ` ${type}`
      : " properties"
    : " properties";

  query += saleType ? `, avialble for ${saleType}` : " available";
  query += location ? ` at ${location}` : "";

  return query;
};

const tokens = {};

export function parseJwt(token) {
  if (tokens[token]) return tokens[token];

  var base64Url = token.split(".")[1];
  var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  var jsonPayload = decodeURIComponent(
    atob(base64)
      .split("")
      .map(function(c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );

  const result = JSON.parse(jsonPayload);
  tokens[token] = result;

  return result;
}
export function get_user() {
  let user;

  const ctoken = Cookies.get("jay_ne");
  if (ctoken) {
    const _user = parseJwt(ctoken);
    user = {
      ..._user.user,
      profilePic:
        _user?.user.profilePic && `${_user.user.profilePic}?${Date.now()}`,
      iat: _user.iat,
    };
  }

  const isAdmin = user && user.role === "admin";

  return { user, isAdmin };
}

export const logout = async () => {
  return await axiosInstance.get("/logout");
};

export const toBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

export const updateUrl = (
  baseurl,
  router,
  searchFiltersObj = {},
  updateObj,
  reset = false
) => {
  const updatedUrl = Object.keys(searchFiltersObj).reduce((acc, cur, i) => {
    let intermediateStr;

    intermediateStr =
      updateObj[cur] || reset
        ? `${cur}=${updateObj[cur] || ""}`
        : `${cur}=${searchFiltersObj[cur]}`;

    if (cur === "location" || cur === "saleType") {
      intermediateStr = `${cur}=${updateObj[cur] || ""}`;
    }

    if (cur === "currentPage") {
      intermediateStr = `${cur}=${updateObj[cur] || 1}`;
    }

    return i === 0 ? acc + `?${intermediateStr}` : acc + `&${intermediateStr}`;
  }, "");

  router.push(`${baseurl}${updatedUrl}`);
};

export const generateUrl = (searchFiltersObj = {}) => {
  let firstRecord = true;

  return Object.keys(searchFiltersObj).reduce((acc, cur, i) => {
    const intermediateStr = searchFiltersObj[cur]
      ? `${cur}=${searchFiltersObj[cur]}`
      : "";

    if (!intermediateStr) return acc;

    const finalVal = firstRecord
      ? acc + `?${intermediateStr}`
      : acc + `&${intermediateStr}`;

    firstRecord = false;
    return finalVal;
  }, "");
};

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

export const calculateQuantity = (item) =>
  JSON.parse(item.options).reduce((acc, cur) => {
    if (cur.name.toLowerCase() !== "size") return acc;

    const sumOFOpt = cur.options.reduce((acc, cur) => {
      return (Number(cur.split(":")[1]) || 0) + acc;
    }, 0);

    return sumOFOpt + acc;
  }, 0);

export function getExtension(filename) {
  var parts = filename.split(".");
  return parts[parts.length - 1];
}

export function isImage(filename) {
  var ext = getExtension(filename);
  switch (ext.toLowerCase()) {
    case "jpg":
    case "jpeg":
    case "gif":
    case "bmp":
    case "png":
      //etc
      return true;
  }
  return false;
}

export function isVideo(filename) {
  var ext = getExtension(filename);
  switch (ext.toLowerCase()) {
    case "m4v":
    case "avi":
    case "mpg":
    case "mp4":
      // etc
      return true;
  }
  return false;
}

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

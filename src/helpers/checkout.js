// /** @format */

// export const playCheckout = ({
//   tranref,
//   country,
//   currency,
//   amount,
//   callbackurl,
//   full_name,
//   email,
//   mobile_no,
//   customization,
//   description,
//   public_key,
//   callback,
//   pocketReference,
//   close,
// }) => {
//   const SeerbitPay = window.SeerbitPay;

//   console.log(SeerbitPay, "seerbitPay");

//   var paywithSeerbit = () => {
//     var handler = SeerbitPay.pay(
//       {
//         tranref,
//         currency,
//         description,
//         country,
//         amount,
//         callbackurl,
//         public_key,
//         full_name,
//         email,
//         mobile_no,
//         customization,
//         pocketReference,
//       },
//       function callback(response) {
//         console.log(response, "success");
//         setTimeout(() => {
//           tryt();
//         }, 3000);
//       },
//       function close(close) {
//         console.log(close);
//       }
//     );

//     // console.log(handler);

//     handler.openPayModal();

//     const tryt = () => {
//       handler.closePayModal();
//     };
//   };
//   paywithSeerbit();
// };

/** @format */

export const playCheckout = ({
	tranref,
	country,
	currency,
	amount,
	callbackurl,
	full_name,
	email,
	mobile_no,
	customization,
	description,
	public_key,
	callback,
	pocketReference,
	close,
}) => {
	window.SeerbitPay(
		{
			tranref,
			currency,
			description,
			country,
			amount,
			callbackurl,
			public_key,
			full_name,
			email,
			mobile_no,
			customization,
			pocketReference
		},
		callback,
		close
	)
};

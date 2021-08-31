import Error from "components/Error";

function Err() {
  return <Error type="err" />;
}

// Err.getInitialProps = ({ res, err }) => {
//   const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
//   return { statusCode };
// };

export default Err;

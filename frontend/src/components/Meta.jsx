import { Helmet } from "react-helmet";

const Meta = ({ title, description }) => {
  return (
    <Helmet>
      <title>{title || "Default Title"}</title>
      {console.log(title)}
      {description && <meta name="description" content={description} />}
    </Helmet>
  );
};

export default Meta;

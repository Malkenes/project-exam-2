import { Link } from "react-router-dom";

export const Home: React.FC = () => {
  return (
    <main>
      <hgroup>
        <h1>Home</h1>
        <p>Where components are tested</p>
      </hgroup>
      <div>
        <Link to={"edit/profile"}>edit</Link>
      </div>
    </main>
  );
};

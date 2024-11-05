import { MultiSteps } from "./forms/index";

export const Register: React.FC = () => {
  console.log("hei");
  return (
    <main>
      <hgroup>
        <h1>Register</h1>
        <p>Your journey starts here Register to find your perfect retreat</p>
      </hgroup>
      <div>
        <MultiSteps />
      </div>
    </main>
  );
};

import { Unauthorized } from "../../components/unauthorized";
import { useHolidazeStore } from "../../stores";
import { MultiSteps } from "./forms";

export const ListVenue: React.FC = () => {
  const { userData } = useHolidazeStore();

  if (!userData.accessToken) {
    return <Unauthorized />;
  }

  return (
    <main>
      <hgroup>
        <h1>List Venue</h1>
        <p>
          Showcase your unique space and let travelers find their perfect
          getaway. Ready to share your venue with the world? Start listing now
        </p>
      </hgroup>
      <div>
        <MultiSteps />
      </div>
    </main>
  );
};

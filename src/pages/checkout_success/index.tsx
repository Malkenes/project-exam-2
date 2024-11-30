import React from "react";
import { Unauthorized } from "../../components/unauthorized";
import { useHolidazeStore } from "../../stores";

export const CheckoutSuccess: React.FC = () => {
  const { userData } = useHolidazeStore();
  if (!userData.accessToken) {
    return <Unauthorized />;
  }

  return (
    <main>
      <hgroup>
        <h1>Booking confirmed</h1>
        <p>Thank you for booking your accomodation with us</p>
      </hgroup>
      <div>
        <div>
          <h2>Next steps</h2>
          <p>
            Check your email for a confirmation and all the details you need
            about your stay.
          </p>
          <p>
            You can view or manage your booking in your account dashboard
            anytime.
          </p>
        </div>
        <div>
          <h2>What to Expect</h2>
          <p>
            We'll make sure your accommodation is ready for your arrival. From
            personalized services to local recommendations, we're here to make
            your trip special. Feel free to reach out with any requests in
            advance!
          </p>
        </div>
      </div>
    </main>
  );
};

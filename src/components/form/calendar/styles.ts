import styled from "styled-components";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

export const CalendarContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

export const StyledCalendar = styled(Calendar)`
  border: none;
  font-family: inherit;
  padding: 8px;

  .react-calendar__navigation button {
    font-size: 24px;
  }

  .react-calendar__month-view__weekdays {
    font-weight: bold;
    text-transform: uppercase;
    font-size: 0.9em;
    color: #4a4a4a;
    padding: 10px 0;
  }

  .react-calendar__tile {
    font-size: 0.9em;
    padding: 10px;
    margin: 4px 0;
    background: none;
    color: #4a4a4a;
    &:hover,
    &:focus {
      background: ${(props) => props.theme.colors.secondary};
      color: white;
      border-radius: 4px;
      margin: 0;
    }
  }

  .react-calendar__tile--hover {
    background-color: rgba(139, 139, 223, 0.25);
    color: black;
  }

  .react-calendar__tile--active {
    background: rgba(139, 139, 223, 0.25);
    color: black;
  }

  .react-calendar__tile--rangeStart,
  .react-calendar__tile--rangeEnd {
    background: ${(props) => props.theme.colors.secondary};
    border-radius: 4px;
    color: white;
    margin: 0;
  }

  .react-calendar__viewContainer {
    gap: 16px;
  }
  .react-calendar__tile:disabled {
    text-decoration-line: line-through;
    color: #6c757d;
    &:hover {
      background: none;
    }
  }
`;

export const StyledTravelRange = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 48px;
  > div {
    max-width: 350px;
  }
`;

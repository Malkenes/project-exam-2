import * as S from "./styles";
import { StyledInputContainer } from "../styles";
import { differenceInCalendarDays } from "date-fns";
import { useMediaQuery } from "../../../hooks/useMediaQuery";

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

interface BookingCalendarProps {
  full: Date[];
  value: Value;
  onChange: (value: Value) => void;
}

export const BookingCalendar: React.FC<BookingCalendarProps> = ({
  full,
  value,
  onChange,
}) => {
  const tileDisabled: ({
    date,
    view,
  }: {
    date: Date;
    view: string;
  }) => boolean = ({ date, view }) => {
    if (view === "month") {
      return full.some((dDate) => isSameDay(dDate, date));
    }
    return false;
  };
  const isSmallScreen = useMediaQuery("(max-width: 768px)");

  return (
    <S.CalendarContainer>
      <S.StyledCalendar
        onChange={onChange}
        showNeighboringMonth={false}
        selectRange={true}
        showDoubleView={!isSmallScreen}
        minDate={new Date()}
        tileDisabled={tileDisabled}
        value={value}
        prev2Label={null}
        next2Label={null}
      />
      <div>
        <h3>Travel Date</h3>
        {Array.isArray(value) && (
          <S.StyledTravelRange>
            <StyledInputContainer>
              <input
                disabled
                type="text"
                name=""
                id="from"
                value={value[0] ? value[0]?.toDateString() : ""}
              />
              <label htmlFor="from">From</label>
            </StyledInputContainer>
            <StyledInputContainer>
              <input
                disabled
                type="text"
                name=""
                id="to"
                value={value[1] ? value[1]?.toDateString() : ""}
              />
              <label htmlFor="to">To</label>
            </StyledInputContainer>
          </S.StyledTravelRange>
        )}
      </div>
    </S.CalendarContainer>
  );
};

function isSameDay(a: Date, b: Date): boolean {
  return differenceInCalendarDays(a, b) === 0;
}

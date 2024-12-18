import { useForm } from "react-hook-form";
import { StyledInputContainer } from "../styles";
import {
  StyledDatePicker,
  StyledGuestInput,
  StyledQueryInput,
  StyledSearchButton,
  StyledSearchContainer,
  StyledSearchForm,
} from "./styles";
import { StyledCalendar } from "../calendar/styles";
import { useMediaQuery } from "../../../hooks/useMediaQuery";
import { FormFieldset } from "../formFieldset";
import { useState } from "react";
import { useHolidazeStore } from "../../../stores";
import { useNavigate } from "react-router-dom";
interface SearchData {
  query: string;
  dateFrom: string;
  dateTo: string;
  guests: number;
}

interface Props {
  calendar: Date[];
  guests: number;
  setIsCalendarOpen: (state: boolean) => void;
  setIsGuestsOpen: (state: boolean) => void;
}

const SearchBar: React.FC<Props> = ({
  setIsCalendarOpen,
  setIsGuestsOpen,
  calendar,
  guests,
}) => {
  const { setSearchState, search } = useHolidazeStore();
  const { register, handleSubmit, setValue } = useForm<SearchData>();
  const navigate = useNavigate();

  const handleFormSubmit = (data: SearchData) => {
    setSearchState({
      query: data.query,
      dateFrom: new Date(data.dateFrom),
      dateTo: new Date(data.dateTo),
      guests: data.guests,
    });
    navigate("/search");
  };

  setValue("dateFrom", calendar[0].toISOString().split("T")[0]);
  setValue("dateTo", calendar[1].toISOString().split("T")[0]);
  setValue("guests", guests);

  return (
    <StyledSearchForm onSubmit={handleSubmit(handleFormSubmit)}>
      <StyledQueryInput>
        <input
          defaultValue={search.query}
          type="search"
          placeholder="Accommodation Name"
          id="query"
          {...register("query")}
        />
        <label htmlFor="query">Accomodation Name</label>
      </StyledQueryInput>
      <StyledDatePicker onClick={() => setIsCalendarOpen(true)}>
        <StyledInputContainer>
          <input
            type="text"
            placeholder="From"
            id="from"
            readOnly
            {...register("dateFrom")}
          />
          <label htmlFor="from">From</label>
        </StyledInputContainer>
        <StyledInputContainer>
          <input
            type="text"
            placeholder="To"
            id="to"
            readOnly
            {...register("dateTo")}
          />
          <label htmlFor="to">To</label>
        </StyledInputContainer>
      </StyledDatePicker>
      <StyledGuestInput onFocus={() => setIsGuestsOpen(true)}>
        <input
          type="text"
          placeholder="Guests"
          id="guests"
          readOnly
          value={guests}
          {...register("guests")}
        />
        <label htmlFor="guests">Guests</label>
      </StyledGuestInput>
      <StyledSearchButton $variant="primary" type="submit">
        Search
      </StyledSearchButton>
    </StyledSearchForm>
  );
};

export const SearchBarContainer: React.FC = () => {
  const { search } = useHolidazeStore();
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [isGuestsOpen, setIsGuestsOpen] = useState(false);
  const [guestValue, setGuestValue] = useState(search.guests);
  const [calendarValue, setCalendarValue] = useState<[Date, Date]>([
    search.dateFrom,
    search.dateTo,
  ]);
  const isSmallScreen = useMediaQuery("(max-width: 768px)");
  return (
    <StyledSearchContainer>
      <SearchBar
        calendar={calendarValue}
        guests={guestValue}
        setIsCalendarOpen={setIsCalendarOpen}
        setIsGuestsOpen={setIsGuestsOpen}
      />
      <div style={{ display: "flex", justifyContent: "center" }}>

        {isCalendarOpen && (
          <StyledCalendar
            onChange={(value) => {
              setCalendarValue(value as [Date, Date]);
              setIsCalendarOpen(false);
            }}
            selectRange={true}
            showDoubleView={!isSmallScreen}
            minDate={new Date()}
            prev2Label={null}
            next2Label={null}
          />
        )}
      </div>
      {isGuestsOpen && (
        <FormFieldset
          name=""
          max={10}
          selectedValue={guestValue}
          onChange={(value) => {
            setGuestValue(value);
            setIsGuestsOpen(false);
          }}
        />
      )}
    </StyledSearchContainer>
  );
};

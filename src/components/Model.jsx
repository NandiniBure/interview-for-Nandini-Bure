import React, { useEffect, useState } from "react";
import { DateRangePicker } from "react-date-range";
import { subWeeks, subMonths, isSameDay } from "date-fns";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import "./style.css"; // custom CSS here

const Model = ({ range, setRange }) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const customRanges = [
    {
      label: "Past week",
      range: () => ({
        startDate: subWeeks(new Date(), 1),
        endDate: new Date(),
      }),
      isSelected(range) {
        const defined = this.range();
        return (
          isSameDay(range.startDate, defined.startDate) &&
          isSameDay(range.endDate, defined.endDate)
        );
      },
    },
    {
      label: "Past month",
      range: () => ({
        startDate: subMonths(new Date(), 1),
        endDate: new Date(),
      }),
      isSelected(range) {
        const defined = this.range();
        return (
          isSameDay(range.startDate, defined.startDate) &&
          isSameDay(range.endDate, defined.endDate)
        );
      },
    },
    {
      label: "Past 3 months",
      range: () => ({
        startDate: subMonths(new Date(), 3),
        endDate: new Date(),
      }),
      isSelected(range) {
        const defined = this.range();
        return (
          isSameDay(range.startDate, defined.startDate) &&
          isSameDay(range.endDate, defined.endDate)
        );
      },
    },
    {
      label: "Past 6 months",
      range: () => ({
        startDate: subMonths(new Date(), 6),
        endDate: new Date(),
      }),
      isSelected(range) {
        const defined = this.range();
        return (
          isSameDay(range.startDate, defined.startDate) &&
          isSameDay(range.endDate, defined.endDate)
        );
      },
    },
    {
      label: "Past year",
      range: () => ({
        startDate: subMonths(new Date(), 12),
        endDate: new Date(),
      }),
      isSelected(range) {
        const defined = this.range();
        return (
          isSameDay(range.startDate, defined.startDate) &&
          isSameDay(range.endDate, defined.endDate)
        );
      },
    },
    {
      label: "Past 2 years",
      range: () => ({
        startDate: subMonths(new Date(), 24),
        endDate: new Date(),
      }),
      isSelected(range) {
        const defined = this.range();
        return (
          isSameDay(range.startDate, defined.startDate) &&
          isSameDay(range.endDate, defined.endDate)
        );
      },
    },
  ];

  return (
    <div className="flex justify-center">
      <div className="w-full  max-w-[300px] sm:max-w-[700px] bg-white rounded-lg shadow-lg p-4 sm:p-6 overflow-auto">
        <DateRangePicker
          onChange={(item) => setRange([item.selection])}
          ranges={range}
          months={isMobile ? 1 : 2}
          direction={isMobile ? "vertical" : "horizontal"}
          staticRanges={customRanges}
          inputRanges={[]}
          className="flex "
        />
      </div>
    </div>
  );
};

export default Model;

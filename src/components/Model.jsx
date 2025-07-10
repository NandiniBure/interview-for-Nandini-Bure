import React, { useState } from "react";
import { DateRangePicker } from "react-date-range";
import { subWeeks, subMonths, isSameDay } from "date-fns";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

const Model = ({ range, setRange }) => {
  console.log(range);

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
    <div className="flex  rounded-lg  shadow-lg bg-white p-6">
      <DateRangePicker
        onChange={(item) => setRange([item.selection])}
        ranges={range}
        months={2}
        direction="horizontal"
        staticRanges={customRanges}
        inputRanges={[]} // disables "days from today" inputs
      />
    </div>
  );
};

export default Model;

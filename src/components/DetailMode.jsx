import React from "react";
import { formatDate } from "../utils/DateFormate";
import { getStatusColor } from "../utils/StatusColor";
import Wiki_logo from "../assets/wiki_logo.png";
import NASA_logo from "../assets/nasa_logo.png";
import YouTube_logo from "../assets/youtube.png";
const CRSCard = ({ data }) => {
  console.log("data=====>", data);

  return (
    <div className=" w-[300px]  sm:w-[500px]  mx-auto p-4 bg-white shadow-lg rounded-xl border border-gray-200">
      <div className="flex items-start px-4 gap-4">
        {data.links?.patch.small && (
          <img
            src={data.links.patch.small}
            alt="CRS-1 Patch"
            className="w-16 h-16 rounded"
          />
        )}
        <div className="flex-1">
          <div className="flex items-center  gap-5">
            <h2 className="text-lg font-semibold">{data.name}</h2>
            <span
              className={`px-2 py-1 mt-1 rounded-full text-xs font-medium ${getStatusColor(
                data.upcoming ? "Upcoming" : data.success ? "Success" : "Failed"
              )}`}
            >
              {data.upcoming ? "Upcoming" : data.success ? "Success" : "Failed"}
            </span>
          </div>
          <div>{data.rocketName}</div>

          <div className="flex">
            {data.links.webcast && (
              <a
                href={data.links.webcast}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline"
              >
                {" "}
                <img src={NASA_logo} className="h-8 w-8" />
              </a>
            )}
            {data.links.wikipedia && (
              <a
                href={data.links.wikipedia}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline"
              >
                <img src={Wiki_logo} className="h-8 w-8" />
              </a>
            )}
            {data.links.youtube_id && (
              <a
                href={data.links.youtube_id}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline"
              >
                {" "}
                <img src={YouTube_logo} className="h-8 w-8" />
              </a>
            )}
          </div>
        </div>
      </div>

      {data.links.details &&  <p className="text-sm ml-2 text-gray-600 mt-1">
        {data.links.details}{" "}
        {data.links.wikipedia && (
          <a
            href={data.links.wikipedia}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 text-[10px] sm:text-[15px] underline"
          >
            Wikipedia
          </a>
        )}
      </p>}

      <div className="mt-4 px-4 text-sm text-gray-800 space-y-2   ">
        {[
          { label: "Flight Number", value: data.flight_number },
          { label: "Mission Name", value: data.name },
          { label: "Rocket Type", value: data.rocketType },
          { label: "Rocket Name", value: data.rocketName },
          { label: "Manufacturer", value: data.company },
          { label: "Nationality", value: data.country },
          { label: "Launch Date", value: `${formatDate(data.date_utc)} IST` },
          { label: "Payload Type", value: "Dragon 1.0" },
          { label: "Orbit", value: data.orbit || "Not Specified" },
          { label: "Launch Site", value: data.launchpadName },
        ].map((item, index) => (
          <div
            key={index}
            className={`flex justify-between items-center  space-y-2 ${
              index === 9 ? "border-none" : "border-b"
            } py-1`}
          >
            <span className=" text-[10px] flex items-center  sm:text-[15px]">{item.label}</span>
            <span className="text-left w-[100px] sm:w-[200px] text-[10px] sm:text-[15px] items-start flex justify-start ">
              {item.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CRSCard;

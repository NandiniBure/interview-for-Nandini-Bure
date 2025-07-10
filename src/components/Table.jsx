import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { subWeeks, subMonths, isSameDay } from "date-fns";
import { Calendar, ChevronDown, Filter, LoaderIcon } from "lucide-react";
import Model from "./Model";
import { Pagination } from "../utils/Pagination";
import { getStatusColor } from "../utils/StatusColor";
import { formatDate } from "../utils/DateFormate";
import CRSCard from "./DetailMode";

const LaunchTable = () => {
  const [launches, setLaunches] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [detailModel, setDetailModel] = useState(false);
  const [model, setModel] = useState(false);
  const today = new Date();
  const sixMonthsAgo = new Date();
  sixMonthsAgo.setMonth(today.getMonth() - 6);

  // Normalize time to start of day
  sixMonthsAgo.setUTCHours(0, 0, 0, 0); // 00:00:00.000Z
  today.setUTCHours(23, 59, 59, 999); // 23:59:59.999Z
  const [dateRange, setDateRange] = useState([
    {
      startDate: sixMonthsAgo,
      endDate: today,
      key: "selection",
    },
  ]);

  const fetchLaunches = async (pageNumber = 1) => {
    try {
      let query = {};
      if (!dateRange || !dateRange[0]?.startDate || !dateRange[0]?.endDate) {
        console.warn("Date range not set");
        return;
      }

      if (filter === "upcoming") {
        query = { upcoming: true };
      } else if (filter === "success") {
        query = {upcoming: false, success: true };
      } else if (filter === "failed") {
        query = { upcoming: false, success: false };
      }

      const response = await axios.post(
        "https://api.spacexdata.com/v5/launches/query",
        {
          query,
          options: {
            page: pageNumber,
            limit: 10,
            sort: { date_utc: "desc" },
          },
        }
      );
      console.log(response);
      const launches = response.data.docs;

      const launchesWithDetails = await Promise.all(
        launches.map(async (launch) => {
          let launchpadName = null;
          let orbit = null;
          let rocketName = null;
          let rocketType = null;
          let company=null;
          let country=null;
          // Get launchpad name
          try {
            const padRes = await axios.get(
              `https://api.spacexdata.com/v4/launchpads/${launch.launchpad}`
            );
            launchpadName = padRes.data.name;
          } catch (err) {
            console.error("Error fetching launchpad:", err);
          }

          // Get orbit from first payload
          if (launch.payloads.length > 0) {
            try {
              const payloadRes = await axios.get(
                `https://api.spacexdata.com/v4/payloads/${launch.payloads[0]}`
              );
              orbit = payloadRes.data.orbit;
            } catch (err) {
              console.error("Error fetching payload/orbit:", err);
            }
          }

          // Get rocket name
          try {
            const rocketRes = await axios.get(
              `https://api.spacexdata.com/v4/rockets/${launch.rocket}`
            );
            rocketName = rocketRes.data.name;
            rocketType = rocketRes.data.type;
            company = rocketRes.data.company;
            country = rocketRes.data.country;
          } catch (err) {
            console.error("Error fetching rocket:", err);
          }

          return {
            ...launch,
            launchpadName,
            orbit,
            rocketName,
            rocketType,
            company,
            country
          };
        })
      );

      console.log(launchesWithDetails);
      setLaunches(launchesWithDetails);
      //   setPage(response.data.page);
      console.log(response.data.totalPages);
      setTotalPages(response.data.totalPages);
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch launches:", error);
    }
  };

  useEffect(() => {
    fetchLaunches(page);
  }, [page, filter, dateRange]);

  const modalRef = useRef(null);
  const detailRef = useRef(null);

  // Close modal on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setModel(false);
      }
    };

    if (model) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [model]);


  useEffect(() => {
    const handleClickOutside = (event) => {
      if (detailRef.current && !detailRef.current.contains(event.target)) {
        setDetailModel(false);
      }
    };

    if (detailModel) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [detailModel]);



  return (
    <div
      className={` 
         bg-white  w-full h-full min-h-[500px] relative  flex flex-col  items-center justify-center`}
    >
      <div className="   w-[90%] flex justify-between ">
        <div
          onClick={() => setModel(true)}
          className="inline-flex items-center justify-center  font-bold  px-3 py-1.5 rounded-md cursor-pointer text-sm text-gray-700 hover:bg-gray-100"
        >
          <Calendar className="w-5 h-5 mr-2 text-black font-bold" />
          <span className=" text-lg"></span>
          <ChevronDown className="w-5 h-5 ml-2 mt-1 text-gray-600" />
        </div>
        <div className="relative inline-flex items-center text-sm text-gray-700 border px-3 py-1.5 rounded-md shadow-sm hover:bg-gray-100">
          <Filter className="w-4 h-4 mr-2 text-gray-600" />
          <select
            className="appearance-none bg-transparent pr-6 focus:outline-none focus:ring-0 focus:border-none border-none cursor-pointer"
            value={filter}
            onChange={(e) => {
              setFilter(e.target.value);
              setLoading(true);
            }}
          >
            <option value="all">All Launches</option>
            <option value="upcoming">Upcoming Launches</option>
            <option value="success">Successful Launches</option>
            <option value="failed">Failed Launches</option>
          </select>
          <ChevronDown className="w-4 h-4 absolute right-2 text-gray-600 pointer-events-none" />
        </div>
      </div>

      {loading ? (
        <LoaderIcon
          style={{ animationDuration: "3s" }}
          className="w-[50px] h-[50px] my-32  animate-spin "
        />
      ) : (
        <>
          {launches.length > 0 ? (
            <div
              className={`bg-white  w-[90%] mt-20 rounded-lg shadow ${
                model && "opacity-80 "
              }`}
            >
              <div className="overflow-x-auto">
                <table className="   min-w-full text-sm text-left text-gray-700">
                  <thead className="text-xs uppercase bg-gray-50 text-gray-500">
                    <tr>
                      <th className="px-4 py-3">No:</th>
                      <th className="px-4 py-3">Launched (UTC)</th>
                      <th className="px-4 py-3">Location</th>
                      <th className="px-4 py-3">Mission</th>
                      <th className="px-4 py-3">Orbit</th>
                      <th className="px-4 py-3">Launch Status</th>
                      <th className="px-4 py-3">Rocket</th>
                    </tr>
                  </thead>
                  <tbody>
                    {launches.map((launch, index) => (
                      <tr
                        onClick={() => setDetailModel(launch)}
                        key={launch.id}
                        className="border-b"
                      >
                        <td className="px-4 py-3">{index + 1}</td>
                        <td className="px-4 py-3">
                          {formatDate(launch.date_utc)} IST
                        </td>
                        <td className="px-4 py-3">{launch.launchpadName}</td>
                        <td className="px-4 py-3">{launch.name}</td>
                        <td className="px-4 py-3">
                          {launch.orbit || "Not Specified"}
                        </td>
                        <td className="px-4 py-3">
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                              launch.upcoming
                                ? "Upcoming"
                                : launch.success
                                ? "Success"
                                : "Failed"
                            )}`}
                          >
                            {launch.upcoming
                              ? "Upcoming"
                              : launch.success
                              ? "Success"
                              : "Failed"}
                          </span>
                        </td>
                        <td className="px-4 py-3">{launch.rocketName}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <p>No result found for this Specific filter</p>
          )}
        </>
      )}
      <div className="   flex w-[90%]  justify-end items-end ">
        <Pagination
          totalPages={totalPages}
          currentPage={page}
          setCurrentPage={setPage}
        />
      </div>

      {model && (
        <div ref={modalRef} className=" absolute">
          <Model range={dateRange} setRange={setDateRange} />
        </div>
      )}

      {detailModel.id && (
        <div ref={detailRef} className=" absolute">
          <CRSCard data={detailModel} />
        </div>
      )}
    </div>
  );
};

export default LaunchTable;

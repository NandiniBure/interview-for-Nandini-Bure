export const getStatusColor = (status) => {
  switch (status) {
    case "Success":
      return "bg-green-100 text-green-700";
    case "Failed":
      return "bg-red-100 text-red-700";
    case "Upcoming":
      return "bg-yellow-100 text-yellow-700";
    default:
      return "";
  }
};

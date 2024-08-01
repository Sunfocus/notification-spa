import moment from "moment";

// This is function where covert timestamp to the formatted time
export const convertTimeToLocal = (timeStamp: number) => {
    return moment(timeStamp * 1000).format("DD-MM-YYYY, h:mm a");
  };
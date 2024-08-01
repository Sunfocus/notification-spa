import moment from "moment";

export const convertTimeToLocal = (timeStamp: number) => {
    return moment(timeStamp * 1000).format("DD-MM-YYYY, h:mm a");
  };
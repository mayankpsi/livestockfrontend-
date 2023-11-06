import moment from "moment/moment";

const useDateFormat = () => {

 const formattedDate = (dataString,need) => {
    const date = moment(dataString).format("L");
    const time = moment(dataString).format("LT");

    const result = (key) => {
      switch (key) {
         case "date":
          return date;
          case "time":
            return time
         default:
            return `${date} ${time}`;
       }
    }
   
    return result(need);
 }

 const paginationDateFormat = (date) => {
   return moment(date).format("YYYY-MM-DD")
 }

  return {formattedDate, paginationDateFormat};
}

export default useDateFormat;

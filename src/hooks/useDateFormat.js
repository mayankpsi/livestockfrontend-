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

 const getRoundOffDigit = (value,afterDecimal) => {
     const rounded = Math.round(value * 10) / 10;
     const deciOne = rounded.toFixed(afterDecimal);
     return deciOne;
 };

  return {formattedDate, paginationDateFormat,getRoundOffDigit};
}

export default useDateFormat;

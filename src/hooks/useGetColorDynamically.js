import useGetCamelCase from "./useGetCamelCase";

const useGetColorDynamically = () => {
    const { getCamelCase } = useGetCamelCase();
 
    const getDynamicColor = (data,label) => {
      console.log(data,label, "djcbhbdhbchbhcbhdbhbdch")
        if (data) {
          const currentValue = data[getCamelCase(label)];
          const maxValue =
            data?.thresholds[
              label === "heartbeat" ? "heartBeat" : getCamelCase(label)
            ]?.high;
          const minValue =
            data?.thresholds[
              label === "heartbeat" ? "heartBeat" : getCamelCase(label)
            ]?.low;
          const color = currentValue?(
            currentValue > maxValue || currentValue < minValue
              ? "err-color"
              : "color-success--dark "
          ):"err-color";
          return color;
        }
      };

      return {getDynamicColor}
}

export default useGetColorDynamically;

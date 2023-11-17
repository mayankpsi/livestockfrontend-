import useGetCamelCase from "./useGetCamelCase";

const useGetColorDynamically = () => {
    const { getCamelCase } = useGetCamelCase();
 
    const getDynamicColor = (data,ele) => {
        if (data) {
          const currentValue = data[getCamelCase(ele?.label)];
          const maxValue =
            data?.thresholds[
              ele?.label === "heartbeat" ? "heartBeat" : getCamelCase(ele?.label)
            ]?.high;
          const minValue =
            data?.thresholds[
              ele?.label === "heartbeat" ? "heartBeat" : getCamelCase(ele?.label)
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

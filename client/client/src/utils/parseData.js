export const parseData = (unix_timestamp) => {
  const date = new Date(unix_timestamp * 1);
  const hours = date.getHours();
  const minutes = "0" + date.getMinutes();
  // const seconds = "0" + date.getSeconds();
  const formattedTime = hours + ":" + minutes.substr(-2);
  return formattedTime;
};

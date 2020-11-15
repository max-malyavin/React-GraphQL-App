import { notification } from "antd";
export default ({ text, type = "info", title, duration = 1.8, placement }) =>
  notification[type]({
    message: title,
    description: text,
    duration: duration,
    placement,
  });

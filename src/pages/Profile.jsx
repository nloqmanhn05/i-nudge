import Settings from "./Settings";

export default function Profile({ profileProps, coachProps }) {
  const fmt = coachProps?.fmt;
  return <Settings {...profileProps} fmt={fmt} />;
}

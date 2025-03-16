import { secondsToTime } from "@/lib/secondsToTime";

interface ClockProps {
  seconds?: number;
}

export const Clock = ({ seconds }: ClockProps) => {
  return <div>{secondsToTime(seconds)}</div>;
};

import clsx from "clsx";
import { MdInfo } from "react-icons/md";

type AlertProps = {
  className?: string;
  text?: string;
};

export default function Alert({ text, className }: AlertProps) {
  return (
    <div className={clsx(className, "flex space-x-2  p-2 rounded")}>
      <div>
        <MdInfo className="text-xl" />
      </div>
      <p className="text-xs">{text}</p>
    </div>
  );
}

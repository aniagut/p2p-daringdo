import classNames from "classnames";

interface ButtonProps {
  onClick?: () => void;
  className: string;
  testId?: string;
  type?: "submit" | "button" | "reset";
}
export const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  testId,
  className,
  type = "submit",
}) => {
  return (
    <button
      type={type}
      data-testid={testId}
      onClick={onClick}
      className={classNames(
        "bg-blue-600 p-2 rounded-lg hover:bg-blue-800 text-white",
        className
      )}
    >
      {children}
    </button>
  );
};

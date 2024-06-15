import "./RadioButton.scss";

interface RadioButtonProps {
  disabled?: boolean;
  defaultChecked?: boolean;
  id: string;
  label: string;
  name?: string;
  onChange?: (event: React.FormEvent<HTMLInputElement>) => void;
  value?: string;
}

export const RadioButton = ({
  defaultChecked,
  disabled,
  id,
  label,
  name,
  onChange,
  value,
}: RadioButtonProps) => {
  return (
    <div className="flex items-start gap-2">
      <div className="grid place-items-center mt-1">
        <input
          type="radio"
          id={id}
          name={name}
          defaultChecked={defaultChecked}
          disabled={disabled}
          className="peer col-start-1 row-start-1 appearance-none shrink-0 w-4 h-4 border-2 border-blue-500 rounded-full focus:outline-none focus:ring-offset-0 focus:ring-2 focus:ring-blue-400 disabled:border-gray-400 cursor-pointer"
          onChange={onChange}
          value={value}
        />
        <div
          className={[
            "pointer-events-none",
            "col-start-1 row-start-1",
            "w-2 h-2 rounded-full peer-checked:bg-blue-500",
            "peer-checked:peer-disabled:bg-gray-400",
          ].join(" ")}
        />
      </div>
      <label htmlFor={id} className="label text-start hover:cursor-pointer">
        {label}
      </label>
    </div>
  );
};

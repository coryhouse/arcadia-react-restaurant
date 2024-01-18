type InputProps = {
  /** input __value__ [more info](http://google.com)
   * Reasons:
   * - big
   * - free
   * - cheap
   */
  value: string | number;

  /** CSS class applied to the root wrapping div */
  className?: string;

  /** input label */
  label: string;

  /** input id */
  id: string;

  /** input onChange */
  onChange: React.ChangeEventHandler<HTMLInputElement>;

  /** input type */
  type?: "text" | "number" | "phone" | "email" | "password";
};

export function Input({
  id,
  className,
  label,
  value,
  onChange,
  type = "text",
}: InputProps) {
  return (
    <div className={className}>
      <label htmlFor={id} className="block font-bold">
        {label}
      </label>
      <input
        id={id}
        type={type}
        className="border-2 border-gray-400"
        value={value}
        onChange={onChange}
      />
    </div>
  );
}
import { FieldError } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { cn } from "@/lib/utils";
import { useMediaQuery } from "usehooks-ts";

type Props = {
  control: any;
  name: string;
  label?: string;
  placeholder?: string;
  error: FieldError | undefined;
  area?: boolean;
  type?: string;
  className?: string;
  disabled?: boolean;
};

export const CustomField = ({
  control,
  name,
  label,
  placeholder,
  error,
  area = false,
  type = "text",
  className,
  disabled,
}: Props) => {
  const desktop = useMediaQuery("(min-width: 1280px)");

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={cn(className, "flex flex-col w-full relative")}>
          <FormLabel className="font-medium text-16 tracking-4">
            {label}
          </FormLabel>
          <FormControl>
            {!area ? (
              <Input
                type={type}
                placeholder={placeholder}
                {...field}
                disabled={disabled}
                className={error?.message && "border-[#BA1A1A]"}
              />
            ) : (
              <Textarea
                rows={desktop ? 7 : 5}
                placeholder={placeholder}
                {...field}
                className={error?.message && "border-[#BA1A1A]"}
              />
            )}
          </FormControl>
          <FormMessage
            className={cn(
              "absolute -bottom-5 left-0 text-[12px] font-medium leading-[130%] text-[#BA1A1A]"
            )}
          >
            {error?.message}
          </FormMessage>
        </FormItem>
      )}
    />
  );
};

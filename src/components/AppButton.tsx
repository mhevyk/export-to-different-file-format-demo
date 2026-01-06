import type { ComponentPropsWithoutRef } from "react";

type AppButtonProps = ComponentPropsWithoutRef<"button">;

export const AppButton = ({ type = "button", ...rest }: AppButtonProps) => {
  return <button type={type} {...rest} />;
};

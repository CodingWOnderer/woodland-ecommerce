import React, { useState } from "react";
import { Button, ButtonProps } from "../ui/button";

interface ToggleButtonProps extends Omit<ButtonProps, "onChange"> {
  ActiveIcon: React.ElementType;
  DeactiveIcon: React.ElementType;
  onChange: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const ToggleButton = React.forwardRef<HTMLButtonElement, ToggleButtonProps>(
  ({ ActiveIcon, DeactiveIcon, onChange, value, className, ...props }, ref) => {
    const [toggleState, setToggleState] = useState(!!value);

    return (
      <Button
        {...props}
        type="button"
        className="border h-12 w-full"
        onClick={(e) => {
          e.stopPropagation();
          const newToggleState = !toggleState;
          setToggleState(newToggleState);
          onChange({
            ...e,
            currentTarget: { ...e.currentTarget, value: `${toggleState}` },
          });
        }}
        ref={ref}
      >
        {toggleState ? (
          <ActiveIcon size={24} className={"text-primary"} />
        ) : (
          <DeactiveIcon size={24} className={"text-primary"} />
        )}
      </Button>
    );
  }
);

ToggleButton.displayName = "ToggleButton";

export default ToggleButton;

import { FormGroup, FormControlLabel, Checkbox } from "@mui/material";
import { useState } from "react";

interface Props {
  options: any[];
  onChange: (event: any) => void;
  selectedOptions?: string[];
}

function CheckBoxGroup({ options, onChange, selectedOptions }: Props) {
  const [checkedItems, setCheckedItems] = useState<string[] | undefined>(
    selectedOptions || []
  );

  function handleChecked(value: string) {
    const currentIndex = checkedItems?.findIndex((item: any) => item === value);
    let newChecked: string[] | undefined = [];
    if (currentIndex === -1) newChecked = [...checkedItems!, value];
    else newChecked = checkedItems?.filter((item: any) => item !== value);

    setCheckedItems(newChecked);
    onChange(newChecked);
  }

  return (
    <>
      <FormGroup>
        {options.map((option, index) => (
          <FormControlLabel
            key={index}
            control={
              <Checkbox
                checked={checkedItems?.indexOf(option) !== -1}
                onClick={() => handleChecked(option)}
                value={checkedItems}
              />
            }
            label={option}
          />
        ))}
      </FormGroup>
    </>
  );
}

export default CheckBoxGroup;

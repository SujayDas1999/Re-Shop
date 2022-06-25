import {
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";

interface Props {
  options: any[];
  onChange: (event: any) => void;
  selectedValue: string;
}

function RadioButtonGroup({ options, onChange, selectedValue }: Props) {
  return (
    <>
      <FormControl>
        <RadioGroup onChange={onChange} value={selectedValue}>
          {options.map(({ value, label }, index) => (
            <FormControlLabel
              key={index}
              value={value}
              control={<Radio />}
              label={label}
            />
          ))}
        </RadioGroup>
      </FormControl>
    </>
  );
}

export default RadioButtonGroup;

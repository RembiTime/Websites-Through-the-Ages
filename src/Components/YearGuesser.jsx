import { NumberInput } from '@mantine/core';
import PropTypes from 'prop-types';
import './components.css'

function YearGuesser({value, setValue, error, setError, result}) {

  return (
    <NumberInput
        size="xl"
        placeholder="Year"
        maw={120}
        m="auto"
        styles={{input: {fontFamily: "Inconsolata, monospace"}, error: {fontSize: "15px", marginLeft: "-100%", marginRight: "-100%", textAlign: "center"}}}
        value={value}
        onChange={(val) => {setValue(val); setError("")}}
        allowDecimal={false}
        allowNegative={false}
        min={1995}
        max={2025}
        stepHoldDelay={500}
        stepHoldInterval={100}
        error={error}
        classNames={{input: result}}
        disabled={result !== ""}
    />
  );
}

YearGuesser.propTypes = {
    value: PropTypes.oneOfType([PropTypes.number, PropTypes.string, PropTypes.bool]).isRequired,
    setValue: PropTypes.func.isRequired,
    error: PropTypes.string.isRequired,
    setError: PropTypes.func.isRequired,
    result: PropTypes.string.isRequired,
}

export default YearGuesser;
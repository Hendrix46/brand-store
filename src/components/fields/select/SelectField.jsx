import { Select } from '@mantine/core';

export default function SelectField({label, placeholder, data, defaultValue, ...rest}) {
    return (
        <Select
            label={label}
            placeholder={placeholder}
            data={data}
            defaultValue={defaultValue}
            allowDeselect
            clearable
            {...rest}
        />

    );
}
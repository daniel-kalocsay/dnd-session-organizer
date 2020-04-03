import React from "react";

import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import Slider from "@material-ui/core/Slider";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";

const GridSizeForm = (props: any) => {
    const marks = [
        {
            value: 10,
            label: "10x10",
        },
        {
            value: 40,
            label: "20x20",
        },
        {
            value: 90,
            label: "30x30",
        },
    ];

    const valuetext = (value: number) => {
        return `${value}x${value}`;
    };

    const valueLabelFormat = (value: number) => {
        let index = marks.findIndex((mark) => mark.value === value) + 1;
        return Math.pow(index, 2) * 100;
    };

    return (
        <div>
            <form onSubmit={props.onSubmit}>
                <FormControl>
                    <TextField variant={"outlined"} name='combatfieldName'/>
                    <Button type={"submit"} variant={"outlined"}>Create New Combatfield</Button>
                </FormControl>
            </form>

            <Typography id="discrete-slider-restrict" gutterBottom>
                Choose the grid size of your combat field
            </Typography>

            {/*width*/}
            <Slider
                defaultValue={10}
                valueLabelFormat={valueLabelFormat}
                getAriaValueText={valuetext}
                onChangeCommitted={props.saveSize}
                aria-labelledby="discrete-slider-restrict"
                step={null}
                valueLabelDisplay="auto"
                marks={marks}
            />

            {/*height*/}
            {/*<Slider*/}
            {/*    orientation={"vertical"}*/}
            {/*    defaultValue={10}*/}
            {/*    valueLabelFormat={valueLabelFormat}*/}
            {/*    getAriaValueText={valuetext}*/}
            {/*    onChangeCommitted={saveSize}*/}
            {/*    aria-labelledby="discrete-slider-restrict"*/}
            {/*    step={null}*/}
            {/*    valueLabelDisplay="auto"*/}
            {/*    marks={marks}*/}
            {/*/>*/}
        </div>
    )
};

export default GridSizeForm;
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
        <form onSubmit={props.onSubmit} style={styles.container}>
            <FormControl style={styles.input}>
                <TextField variant={"outlined"} name='combatfieldName' placeholder={"Combatfield name"}/>
            </FormControl>

            <div style={styles.slider}>
                <Typography id="discrete-slider-restrict" gutterBottom={true} >
                    Choose the size of your combat field
                </Typography>

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
            </div>

            <Button style={styles.button}
                    type={"submit"}
                    variant={"outlined"}
                    color={"primary"}
                    size={"medium"}
            >
                Create New Combatfield
            </Button>

        </form>
    )
};

export default GridSizeForm;

const styles = {

    // define grid
    container: {
        display: "grid",
        gridTemplateRows: "repeat(3, 1fr)"
    },

    // grid cell positioning
    input: {
        gridRow: "1/2"
    },
    slider: {
        gridRow: "2/3"
    },
    button: {
        gridRow: "3/4"
    }
};
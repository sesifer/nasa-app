import React, { useState } from "react";
import { Dialog } from "@material-ui/core";
import { createStyles, makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) =>
    createStyles({
        media: {
            width: "100%",
            height: "auto",
            maxWidth: "25vw",
        },
        mediaOpen: {
            height: "auto",
            width: "100%",
            border: `solid 3px ${theme.palette.secondary.main}`
        },
    })
);

interface ImageComponentProps {
    src: string;
}

const ImageComponent = (props: ImageComponentProps):JSX.Element => {
    const { src } = props;
    const classes = useStyles();
    const [isOpen, setOpen] = useState(false);

    return (
        <div>
            <img
                role="presentation"
                className={classes.media}
                src={src}
                onClick={() => setOpen(!isOpen)}
                alt=" "
            />
            {isOpen && (
                <Dialog
                    onClose={() => setOpen(!isOpen)}
                    open={isOpen}
                >
                    <img
                        role="presentation"
                        className={classes.mediaOpen}
                        src={src}
                        onClick={() => setOpen(!isOpen)}
                        alt=" "
                    />
                </Dialog>
            )}
        </div>
    );
};

export default ImageComponent;

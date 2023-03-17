import React, { FC } from "react";
import { Avatar } from '@mui/material'
import randomColor from "@/utils/helpers/randomColor";

interface AvaProps {
    name: string
}

const Ava: FC<AvaProps> = ({ name }) => {
    return <Avatar alt={name} sx={{ background: randomColor(name), textTransform: 'uppercase' }}>
        {name.charAt(0)}
    </Avatar>;
};

export default Ava;

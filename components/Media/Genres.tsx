import { getGenres } from "@/utils/api/media.api";
import uiConfigs from "@/utils/config/uiConfig";
import { Button, Stack } from "@mui/material";
import { FC, useMemo } from "react";
import { useQuery } from "react-query";

interface GenresProps {
    ids: number[]
}

const Genres: FC<GenresProps> = ({ ids }) => {

    const { data } = useQuery(['genres'], getGenres)
    const genres = useMemo(() => {
        if (!data) return undefined
        return data.genres
    }, [data])

    if (!genres) return <></>

    return <Stack direction={'row'} spacing={1.5}>
        {ids.length > 0 && ids.slice(0, 2).map(id => {
            return <Button
                key={id}
                sx={{
                    bgcolor: uiConfigs.style.red,
                    color: 'white',
                    px: '20px',
                    borderRadius: '999px',
                    '&:hover': {
                        bgcolor: uiConfigs.style.red,
                    },
                    textTransform: 'capitalize',
                    width: 'fit-content',
                    flexShrink: 0
                }}
            >
                {genres.find(item => item.id === id)?.name || 'Free'}
            </Button>
        })}
    </Stack>;
};

export default Genres;

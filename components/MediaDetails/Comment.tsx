import React, { ChangeEvent, FC, useState } from 'react';
import { Box, Button, Stack, Typography, Menu, MenuItem, TextareaAutosize } from '@mui/material';
import { Review } from '@/utils/types/global.type';
import moment from 'moment';
import Ava from '../global/Ava';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import UpgradeIcon from '@mui/icons-material/Upgrade';
import { useAuth } from '@/context/auth.context';
import ClearIcon from '@mui/icons-material/Clear';
import SendIcon from '@mui/icons-material/Send';
import uiConfigs from '@/utils/config/uiConfig';

interface CommentProps {
    review: Review;
    onDelete: (id: number) => void,
    onUpdate: (id: number, content: string) => void
}

const Comment: FC<CommentProps> = ({ review, onDelete, onUpdate }) => {
    const mode = useSelector<RootState>(
        (state) => state.theme.mode
    ) as RootState['theme']['mode'];
    const { auth } = useAuth();

    const [isUpdating, setIsUpdating] = useState(false);
    const [content, setContent] = useState(review.content);

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const toggleUpdate = () => {
        setIsUpdating(!isUpdating)
    }

    const onChangeContent = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setContent(e.target.value)
    }

    const onUpdateBtn = () => {
        if (content === review.content) {
            setIsUpdating(!isUpdating)
            return
        }
        onUpdate(review.id, content)
        setIsUpdating(!isUpdating)
    }

    return (
        <Box>
            <Stack
                direction="row"
                spacing={2}
                position="relative"
                sx={{
                    color: 'text.primary',
                    '&:hover': {
                        bgcolor:
                            mode === 'dark'
                                ? 'rgb(30, 30, 30)'
                                : 'rgb(240, 240, 240)',
                    },
                    p: 1.5,
                    borderRadius: '10px',
                    transition: 'all .2s ease',
                }}
            >
                <Ava name={review.user.displayName} />
                <Box sx={{ flex: 1 }}>
                    <Typography
                        variant="h5"
                        fontSize={'18px'}
                        fontWeight={'500'}
                    >
                        {review.user.displayName}
                    </Typography>
                    <Typography fontSize={'14px'} sx={{ opacity: 0.8 }}>
                        {`${moment(review.createdAt).format(
                            'DD/MM/YYYY'
                        )} - ${moment(review.createdAt).fromNow()}`}
                    </Typography>
                    {!isUpdating ?
                        <Typography
                            variant="subtitle1"
                            sx={{
                                pt: 1,
                                whiteSpace: 'pre-wrap',
                            }}
                        >
                            {review.content}
                        </Typography> :
                        <Box sx={{
                            pt: 1,
                            flex: 1,
                            width: '100%',
                            '& textarea': {
                                width: '100%',
                                outline: 'none',
                                p: 1.5,
                                fontFamily: 'inherit',
                                fontSize: 'inherit',
                                resize: 'none',
                                backgroundColor: 'transparent',
                                color: 'inherit',
                                borderRadius: '4px',
                                lineHeight: '24px',
                            },
                        }}>
                            <TextareaAutosize spellCheck={false} minRows={2} maxRows={10} value={content} onChange={onChangeContent}></TextareaAutosize>
                            <Button
                                startIcon={<SendIcon />}
                                size="large"
                                onClick={onUpdateBtn}
                                sx={{
                                    bgcolor: uiConfigs.style.red,
                                    color: 'white',
                                    '&:hover': { bgcolor: uiConfigs.style.redHover },
                                    px: 2.5,
                                }}
                            >
                                Save
                            </Button>
                        </Box>
                    }
                    {auth.token &&
                        auth.user &&
                        auth.user.userId === review.userId && (
                            <>
                                {isUpdating ?
                                    <Button
                                        size="small"
                                        sx={{
                                            color: 'text.secondary',
                                            position: 'absolute',
                                            top: 10,
                                            right: 10,
                                        }}
                                        onClick={toggleUpdate}
                                        color={'error'}
                                    >
                                        <ClearIcon color='error' />
                                    </Button> :
                                    <Button
                                        size="small"
                                        sx={{
                                            color: 'text.secondary',
                                            position: 'absolute',
                                            top: 10,
                                            right: 10,
                                        }}
                                        onClick={handleClick}
                                    >
                                        <MoreHorizIcon />
                                    </Button>
                                }
                                <Menu
                                    id="user-action"
                                    anchorEl={anchorEl}
                                    open={open}
                                    anchorOrigin={{
                                        vertical: 'bottom',
                                        horizontal: 'right',
                                    }}
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    onClose={handleClose}
                                    MenuListProps={{
                                        'aria-labelledby': 'basic-button',
                                    }}
                                >
                                    <MenuItem
                                        disableGutters
                                        onClick={handleClose}
                                    >
                                        <Button
                                            startIcon={<UpgradeIcon />}
                                            variant="text"
                                            fullWidth
                                            sx={{
                                                color: 'inherit',
                                                '&:hover': { bgcolor: 'unset' },
                                                px: 2,
                                            }}
                                            onClick={toggleUpdate}
                                        >
                                            Update
                                        </Button>
                                    </MenuItem>
                                    <MenuItem
                                        disableGutters
                                        onClick={handleClose}
                                    >
                                        <Button
                                            startIcon={<DeleteOutlineIcon />}
                                            variant="text"
                                            fullWidth
                                            sx={{
                                                color: 'inherit',
                                                '&:hover': { bgcolor: 'unset' },
                                                px: 2,
                                            }}
                                            onClick={() => onDelete(review.id)}
                                        >
                                            Delete
                                        </Button>
                                    </MenuItem>
                                </Menu>
                            </>
                        )}
                </Box>
            </Stack>
        </Box>
    );
};

export default Comment;

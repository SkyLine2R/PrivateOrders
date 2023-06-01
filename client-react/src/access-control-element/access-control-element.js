import * as React from "react";
import Rating from "@mui/material/Rating";
import Box from "@mui/material/Box";
import StarIcon from "@mui/icons-material/Star";
import Typography from "@mui/material/Typography";

const labels = {
  1: "Отключёна",
  2: "Только просмотр",
  3: "Редактирование",
  4: "Полный доступ",
  5: "Администратор",
};

function getLabelText(value) {
  return `${value} Star${value !== 1 ? "s" : ""}, ${labels[value]}`;
}

export default function HoverAccessControl({ value, change }) {
  // const [value, setValue] = React.useState(1);
  const [hover, setHover] = React.useState(-1);

  return (
    <Box
      sx={{
        "& > legend": { mt: 10 },
        width: "100%",
        display: "flex",
        alignItems: "center",
      }}
    >
      <Rating
        name="hover-access"
        size="large"
        value={value}
        precision={1}
        getLabelText={getLabelText}
        onChange={change}
        onChangeActive={(event, newHover) => {
          setHover(newHover);
        }}
        emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
      />
      {value !== null && (
        <Box sx={{ ml: 2 }}>
          <Typography component="legend">
            {labels[hover !== -1 ? hover : value]}
          </Typography>
        </Box>
      )}
    </Box>
  );
}

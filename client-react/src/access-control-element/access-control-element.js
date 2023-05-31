import * as React from "react";
import Rating from "@mui/material/Rating";
import Box from "@mui/material/Box";
import StarIcon from "@mui/icons-material/Star";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";

const labels = {
  1: "Отключён",
  2: "Только просмотр",
  3: "Редактирование",
  4: "Полный доступ",
  5: "Администратор",
};

function getLabelText(value) {
  return `${value} Star${value !== 1 ? "s" : ""}, ${labels[value]}`;
}

export default function HoverAccessControl() {
  const [value, setValue] = React.useState(2);
  const [hover, setHover] = React.useState(-1);

  return (
    <>
      <Typography
        component="legend"
        sx={{ marginTop: "20px", textAlign: "center" }}
      >
        Уровень доступа
      </Typography>
      <Box
        sx={{
          "& > legend": { mt: 10 },
          width: "100%",
          display: "flex",
          alignItems: "center",
          paddingTop: "10px",
        }}
      >
        <Rating
          name="hover-access"
          size="large"
          value={value}
          precision={1}
          getLabelText={getLabelText}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
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
    </>
  );
}

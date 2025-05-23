import { useTheme } from "@mui/material/styles";

export const useThemeColors = ()=>{
  const { palette } = useTheme();
  return {
    primary: palette.primary.main,
    background: palette.background.default,
  };
}

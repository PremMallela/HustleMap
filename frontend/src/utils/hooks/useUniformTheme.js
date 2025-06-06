import { useTheme } from "@mui/material/styles";

export const useUniformTheme = ()=>{
  const { palette } = useTheme();
  return {
    primary: palette.primary.main,
    background: palette.background.default,
  };
}

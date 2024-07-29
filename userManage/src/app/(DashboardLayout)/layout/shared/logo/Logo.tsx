import Link from "next/link";
import { styled,Box } from "@mui/material";
import Image from "next/image";

const LinkStyled = styled(Box)(() => ({
  height: "70px",
  width: "180px",
  overflow: "hidden",
  display: "block",
  textAlign: "center",
  fontSize: "1.5rem",
}));

const Logo = () => {
  return (
    <LinkStyled >
        BitPower Admin
    </LinkStyled>
     

  );
};

export default Logo;
